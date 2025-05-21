#!/usr/bin/env python3
"""
Run Flask app without using the watchdog reloader
This is a workaround for environments with watchdog compatibility issues
"""

from app import app

if __name__ == '__main__':
    print("Starting Flask app without reloader...")
    print("NOTE: Changes to Python files won't auto-reload the server!")
    app.run(debug=True, port=5000, use_reloader=False)
