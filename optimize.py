import os
from PIL import Image

def convert_images_to_webp(directory, quality=50, max_width=2880):
    for root, _, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            try:
                # Open image
                with Image.open(file_path) as img:
                    # Skip if not an image
                    if not img.format:
                        continue
                    
                    # Resize if necessary
                    if img.width > max_width:
                        height = int((max_width / img.width) * img.height)
                        img = img.resize((max_width, height), Image.Resampling.LANCZOS)

                    # Convert to WebP
                    output_path = os.path.splitext(file_path)[0] + ".webp"
                    img.save(output_path, "WEBP", quality=quality)
                    print(f"Converted: {file_path} -> {output_path}")
            except Exception as e:
                print(f"Failed to convert {file_path}: {e}")

# Set the directory to recurse
directory = input("Enter the directory to process: ")
convert_images_to_webp(directory)