#!/usr/bin/env python3
"""
Diagnostic script to check the prompt generator setup
"""

import os
import sys

def check_directory_structure():
    """Check if the prompt directories are correctly set up"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(script_dir)
    prompts_dir = os.path.join(parent_dir, 'prompts')
    
    print(f"Checking directory structure...")
    print(f"Script directory: {script_dir}")
    print(f"Parent directory: {parent_dir}")
    print(f"Prompts directory: {prompts_dir}")
    
    # Check if prompts directory exists
    if not os.path.exists(prompts_dir):
        print(f"ERROR: Prompts directory does not exist: {prompts_dir}")
        return False
    
    # Check subdirectories
    subdirs = ['products', 'personas', 'smalltalks']
    for subdir in subdirs:
        subdir_path = os.path.join(prompts_dir, subdir)
        if not os.path.exists(subdir_path):
            print(f"ERROR: Subdirectory does not exist: {subdir_path}")
            return False
        
        # Check if there are prompt files
        prompt_files = [f for f in os.listdir(subdir_path) if f.endswith('.txt')]
        if not prompt_files:
            print(f"WARNING: No prompt files found in {subdir_path}")
        else:
            print(f"Found {len(prompt_files)} files in {subdir}")
            for file in prompt_files:
                print(f"  - {file}")
    
    print("Directory structure check passed!")
    return True

def main():
    """Main function"""
    print("=== Prompt Generator Diagnostic ===")
    directory_check = check_directory_structure()
    
    if directory_check:
        print("\nAll checks passed! The prompt generator is correctly set up.")
    else:
        print("\nSome checks failed. Please fix the issues and run this script again.")
        sys.exit(1)

if __name__ == "__main__":
    main()
