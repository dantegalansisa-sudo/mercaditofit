"""Convierte imágenes nuevas del root del proyecto a WebP en public/images/products/.

Uso:  python scripts/convert-images.py            -> lista y convierte imágenes nuevas (nombre slug)
      python scripts/convert-images.py src dest    -> convierte un archivo concreto a dest (.webp)
Los originales se mueven a design/originales/productos/.
"""
import os, re, sys, shutil, unicodedata
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public', 'images', 'products')
ARCHIVE = os.path.join(ROOT, 'design', 'originales', 'productos')
EXTS = ('.png', '.jpg', '.jpeg', '.webp', '.avif', '.jfif')

def slug(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode()
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')

def convert(src, dest_name, size=900):
    os.makedirs(OUT, exist_ok=True); os.makedirs(ARCHIVE, exist_ok=True)
    im = Image.open(src)
    im = im.convert('RGBA') if im.mode in ('RGBA', 'LA', 'P') else im.convert('RGB')
    im.thumbnail((size, size), Image.LANCZOS)
    dest = os.path.join(OUT, dest_name)
    im.save(dest, 'WEBP', quality=84, method=6)
    shutil.move(src, os.path.join(ARCHIVE, os.path.basename(src)))
    print(f'{os.path.basename(src)} -> public/images/products/{dest_name} {im.size}')

if __name__ == '__main__':
    if len(sys.argv) == 3:
        convert(sys.argv[1], sys.argv[2])
    else:
        found = [f for f in os.listdir(ROOT) if f.lower().endswith(EXTS)]
        if not found:
            print('Sin imágenes nuevas.')
        for f in found:
            convert(os.path.join(ROOT, f), slug(os.path.splitext(f)[0]) + '.webp')
