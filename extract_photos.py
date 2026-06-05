import fitz, os
from PIL import Image
import io

PDF = r"C:\Users\sahar\Downloads\Wordpress\Wordpress\FDP 3-12th june 2025 (1)_Kausheyee Banerjee.pdf"
OUT = r"C:\Users\sahar\Downloads\Antigravity\AADC\assets\team"
os.makedirs(OUT, exist_ok=True)

doc = fitz.open(PDF)

# Map: ordered list of speaker photo xrefs across pages 5-8
# We'll extract ALL images from pages 5-8, filter for portrait-shaped thumbnails
# (width similar to height, reasonably sized), and match them to speaker order.

speaker_order = [
    "samit-ray",
    "suranjan-das",
    "kallol-paul",
    "sivaji-chakravorti",
    "radha-tamal-goswami",
    "abhijit-chanda",
    "amitava-datta",
    "rajat-acharyya",
    "biswajit-ghosh",
    "pulok-kumar-mukherjee",
    "asis-majumdar",
    "kanchan-mallick",
    "debasish-pal",
    "debajyoti-konar",
    "amiya-kumar-panda",
    "sanjukta-mondal-parui",
    "ashish-pundhir",
    "debanjan-chakrabarti",
    "sudeshna-mukhopadhyay",
    "ajitava-raychaudhuri",
    "rudra-prasad-saha",
    "moumita-mukherjee",
    "saptarshi-chatterjee",
    "chiranjib-bhattacharya",
]

collected = []

for pg_idx in [4, 5, 6, 7]:
    page = doc[pg_idx]
    imgs = page.get_images(full=True)
    print(f"Page {pg_idx+1}: {len(imgs)} images found")
    for img_info in imgs:
        xref = img_info[0]
        try:
            base = doc.extract_image(xref)
            w, h = base["width"], base["height"]
            size = len(base["image"])
            ext  = base["ext"]
            # Filter: must be portrait or square (h >= w*0.7), reasonably sized (> 3KB)
            if size > 3000 and h >= w * 0.6:
                collected.append((pg_idx, xref, w, h, size, ext, base["image"]))
                print(f"  KEEP  pg={pg_idx+1} xref={xref} {w}x{h} {size}B .{ext}")
            else:
                print(f"  skip  pg={pg_idx+1} xref={xref} {w}x{h} {size}B .{ext}")
        except Exception as e:
            print(f"  ERR   {e}")

doc.close()

print(f"\nTotal portrait images collected: {len(collected)}")
print(f"Speaker slots needed: {len(speaker_order)}")

# Save matched images
for i, name in enumerate(speaker_order):
    if i < len(collected):
        _, xref, w, h, size, ext, raw = collected[i]
        img = Image.open(io.BytesIO(raw)).convert("RGB")
        img = img.resize((300, 350), Image.LANCZOS)
        path = os.path.join(OUT, name + ".jpg")
        img.save(path, "JPEG", quality=92)
        final_size = os.path.getsize(path)
        print(f"  Saved {name}.jpg  ({w}x{h} src -> 300x350)  {final_size:,}B")
    else:
        print(f"  MISSING: {name}")

print("\nDone.")
