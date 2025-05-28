from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import datetime
import logging
import traceback

# Configure logging
logging.basicConfig(level=logging.DEBUG, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Define paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PARENT_DIR = os.path.dirname(BASE_DIR)
PROMPTS_DIR = os.path.join(PARENT_DIR, 'prompts')
OUTPUT_DIR = os.path.join(PARENT_DIR, 'output')

# Ensure directories exist
os.makedirs(OUTPUT_DIR, exist_ok=True)
for dir_name in ['products', 'personas', 'smalltalks']:
    os.makedirs(os.path.join(PROMPTS_DIR, dir_name), exist_ok=True)

@app.route('/api/prompts', methods=['GET'])
def get_prompts():
    """Get all available prompts categorized by type"""
    try:
        logger.info("Fetching prompts from directories")
        
        products_dir = os.path.join(PROMPTS_DIR, 'products')
        personas_dir = os.path.join(PROMPTS_DIR, 'personas')
        smalltalks_dir = os.path.join(PROMPTS_DIR, 'smalltalks')
        difficulty_dir = os.path.join(PROMPTS_DIR, 'difficulty')
        
        logger.debug(f"Products directory: {products_dir}")
        logger.debug(f"Personas directory: {personas_dir}")
        logger.debug(f"Smalltalks directory: {smalltalks_dir}")
        logger.debug(f"Difficulty directory: {difficulty_dir}")
        
        # Check if directories exist
        if not os.path.exists(products_dir):
            logger.error(f"Products directory does not exist: {products_dir}")
            return jsonify({"error": "Products directory not found"}), 500
            
        if not os.path.exists(personas_dir):
            logger.error(f"Personas directory does not exist: {personas_dir}")
            return jsonify({"error": "Personas directory not found"}), 500
            
        if not os.path.exists(smalltalks_dir):
            logger.error(f"Smalltalks directory does not exist: {smalltalks_dir}")
            return jsonify({"error": "Smalltalks directory not found"}), 500
        
        # List files in each directory
        products = [f.replace('.txt', '') for f in os.listdir(products_dir) 
                   if f.endswith('.txt')]
        personas = [f.replace('.txt', '') for f in os.listdir(personas_dir) 
                   if f.endswith('.txt')]
        smalltalks = [f.replace('.txt', '') for f in os.listdir(smalltalks_dir) 
                     if f.endswith('.txt')]
        difficulty = [f.replace('.txt', '') for f in os.listdir(difficulty_dir) 
                     if f.endswith('.txt')]
        
        logger.info(f"Found products: {products}")
        logger.info(f"Found personas: {personas}")
        logger.info(f"Found smalltalks: {smalltalks}")
        logger.info(f"Found difficulty: {difficulty}")
        
        return jsonify({
            'products': products,
            'personas': personas,
            'smalltalks': smalltalks,
            'difficulty': difficulty
        })
    except Exception as e:
        logger.error(f"Error fetching prompts: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@app.route('/api/generate', methods=['POST'])
def generate_prompt():
    """Generate a complete prompt from selected components"""
    try:
        data = request.json
        logger.info(f"Received generate request with data: {data}")
        
        # Extract required components
        product = data.get('product')
        persona = data.get('persona')
        smalltalk = data.get('smalltalk')
        difficulty = data.get('difficulty')
        prompt_order = data.get('promptOrder', ['product', 'persona', 'smalltalk', 'difficulty'])
        
        logger.info(f"Using prompt order: {prompt_order}")
        
        # Validate required parameters
        if not all([product, persona, smalltalk, difficulty]):
            missing = []
            if not product: missing.append('product')
            if not persona: missing.append('persona')
            if not smalltalk: missing.append('smalltalk')
            if not difficulty: missing.append('difficulty')
            
            return jsonify({
                'success': False,
                'message': f'Missing required parameters: {", ".join(missing)}'
            }), 400
        
        # Define the paths and read content for each component
        components = {
            'product': {
                'path': os.path.join(PROMPTS_DIR, 'products', f"{product}.txt"),
                'label': 'Product Information'
            },
            'persona': {
                'path': os.path.join(PROMPTS_DIR, 'personas', f"{persona}.txt"),
                'label': 'Persona'
            },
            'smalltalk': {
                'path': os.path.join(PROMPTS_DIR, 'smalltalks', f"{smalltalk}.txt"),
                'label': 'Small Talk'
            },
            'difficulty': {
                'path': os.path.join(PROMPTS_DIR, 'difficulty', f"{difficulty}.txt"),
                'label': 'Difficulty Level'
            }
        }
        
        # Read and validate each component
        prompt_components = {}
        for component_type, component_info in components.items():
            path = component_info['path']
            if not os.path.exists(path):
                return jsonify({
                    'success': False,
                    'message': f'{component_type.capitalize()} prompt file not found: {path}'
                }), 404
                
            with open(path, 'r') as f:
                content = f.read().strip()
                if not content:
                    return jsonify({
                        'success': False,
                        'message': f'{component_type.capitalize()} prompt file is empty: {path}'
                    }), 400
                    
                prompt_components[component_type] = {
                    'label': component_info['label'],
                    'content': content
                }
        
        # Combine prompts according to the provided order
        combined_prompt = "# Generated Prompt\n\n"
        
        # Add timestamp and metadata
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        combined_prompt += f"Generated on: {timestamp}\n"
        combined_prompt += f"Components used:\n"
        combined_prompt += f"- Product: {product}\n"
        combined_prompt += f"- Persona: {persona}\n"
        combined_prompt += f"- Small Talk: {smalltalk}\n"
        combined_prompt += f"- Difficulty: {difficulty}\n\n"
        
        # Add components in specified order
        for component_type in prompt_order:
            if component_type in prompt_components:
                component = prompt_components[component_type]
                combined_prompt += f"## {component['label']}\n{component['content']}\n\n"
        
        # Generate filename with timestamp
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"prompt_{product}_{persona}_{smalltalk}_{difficulty}_{timestamp}.txt"
        file_path = os.path.join(OUTPUT_DIR, filename)
        
        # Save to file
        with open(file_path, 'w') as f:
            f.write(combined_prompt)
        
        logger.info(f"Generated prompt saved to: {file_path}")
        
        return jsonify({
            'success': True,
            'message': f'Prompt generated and saved as {filename}',
            'filename': filename,
            'content': combined_prompt
        })
    except Exception as e:
        logger.error(f"Error generating prompt: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({
            'success': False,
            'message': f'Error generating prompt: {str(e)}'
        }), 500

@app.route('/api/outputs', methods=['GET'])
def get_outputs():
    """Get list of generated output files"""
    try:
        if not os.path.exists(OUTPUT_DIR):
            os.makedirs(OUTPUT_DIR, exist_ok=True)
            
        outputs = [f for f in os.listdir(OUTPUT_DIR) if f.endswith('.txt')]
        outputs.sort(reverse=True)  # Most recent first
        
        logger.info(f"Found {len(outputs)} output files")
        
        return jsonify({
            'outputs': outputs
        })
    except Exception as e:
        logger.error(f"Error getting outputs: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@app.route('/api/output/<filename>', methods=['GET'])
def get_output_content(filename):
    """Get content of a specific output file"""
    try:
        file_path = os.path.join(OUTPUT_DIR, filename)
        logger.debug(f"Reading output file: {file_path}")
        
        if not os.path.exists(file_path):
            logger.warning(f"Output file not found: {file_path}")
            return jsonify({
                'success': False,
                'message': 'File not found'
            }), 404
        
        with open(file_path, 'r') as f:
            content = f.read()
        
        return jsonify({
            'success': True,
            'content': content,
            'filename': filename
        })
    except Exception as e:
        logger.error(f"Error reading output file: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({
            'success': False,
            'message': f'Error reading output file: {str(e)}'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """API health check endpoint"""
    return jsonify({
        'status': 'ok',
        'timestamp': datetime.datetime.now().isoformat()
    })

if __name__ == '__main__':
    logger.info("Starting Flask application")
    logger.info(f"BASE_DIR: {BASE_DIR}")
    logger.info(f"PARENT_DIR: {PARENT_DIR}")
    logger.info(f"PROMPTS_DIR: {PROMPTS_DIR}")
    logger.info(f"OUTPUT_DIR: {OUTPUT_DIR}")
    
    try:
        # Try to run with default reloader
        app.run(debug=True, port=5000)
    except ImportError as e:
        if 'watchdog' in str(e) or 'EVENT_TYPE_OPENED' in str(e):
            logger.warning("Watchdog reloader issue detected. Running without reloader.")
            # Run without watchdog reloader
            app.run(debug=True, port=5000, use_reloader=False)
        else:
            # Re-raise if it's a different ImportError
            raise
