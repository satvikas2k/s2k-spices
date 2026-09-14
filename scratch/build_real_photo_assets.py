import os
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

ASSETS_DIR = r"d:\s2k\soil-to-soul\src\assets"

# Load source high-res real food photographs
spices_src = Image.open(os.path.join(ASSETS_DIR, "spices.jpg")).convert("RGB")
jar_spice_src = Image.open(os.path.join(ASSETS_DIR, "jar-spice.jpg")).convert("RGB")
jar_pickle_src = Image.open(os.path.join(ASSETS_DIR, "jar-pickle.jpg")).convert("RGB")
avakaya_src = Image.open(os.path.join(ASSETS_DIR, "product-avakaya.jpg")).convert("RGB")
tomato_src = Image.open(os.path.join(ASSETS_DIR, "product-tomato.jpg")).convert("RGB")
ginger_src = Image.open(os.path.join(ASSETS_DIR, "product-ginger.jpg")).convert("RGB")
amla_src = Image.open(os.path.join(ASSETS_DIR, "product-amla.jpg")).convert("RGB")
gongura_src = Image.open(os.path.join(ASSETS_DIR, "product-gongura.jpg")).convert("RGB")

def crop_center_square(img):
    w, h = img.size
    min_dim = min(w, h)
    left = (w - min_dim) // 2
    top = (h - min_dim) // 2
    return img.crop((left, top, left + min_dim, top + min_dim)).resize((800, 800), Image.Resampling.LANCZOS)

def adjust_color_balance(img, r_factor=1.0, g_factor=1.0, b_factor=1.0):
    r, g, b = img.split()
    r = r.point(lambda i: min(255, int(i * r_factor)))
    g = g.point(lambda i: min(255, int(i * g_factor)))
    b = b.point(lambda i: min(255, int(i * b_factor)))
    return Image.merge("RGB", (r, g, b))

# 1. Turmeric Powder (Real golden yellow turmeric photo crop from spices.jpg)
w, h = spices_src.size
# Crop lower-right golden yellow turmeric bowl area from spices.jpg
turmeric_crop = spices_src.crop((int(w * 0.4), int(h * 0.3), w, h)).resize((800, 800), Image.Resampling.LANCZOS)
turmeric_img = adjust_color_balance(turmeric_crop, r_factor=1.1, g_factor=1.05, b_factor=0.7)
turmeric_img = ImageEnhance.Color(turmeric_img).enhance(1.35)
turmeric_img = ImageEnhance.Contrast(turmeric_img).enhance(1.1)
turmeric_img.save(os.path.join(ASSETS_DIR, "turmeric-powder.png"))
print("Saved real photo turmeric-powder.png")

# 2. Dhaniya Powder (Real coriander seed brown photo crop from spices.jpg)
dhaniya_crop = spices_src.crop((0, 0, int(w * 0.6), int(h * 0.7))).resize((800, 800), Image.Resampling.LANCZOS)
dhaniya_img = adjust_color_balance(dhaniya_crop, r_factor=1.05, g_factor=0.95, b_factor=0.75)
dhaniya_img = ImageEnhance.Color(dhaniya_img).enhance(1.1)
dhaniya_img.save(os.path.join(ASSETS_DIR, "dhaniya-powder.png"))
print("Saved real photo dhaniya-powder.png")

# 3. Red Chilli Powder (Fiery red chilli photo crop)
chilli_crop = crop_center_square(jar_spice_src)
chilli_img = adjust_color_balance(chilli_crop, r_factor=1.2, g_factor=0.85, b_factor=0.8)
chilli_img = ImageEnhance.Color(chilli_img).enhance(1.4)
chilli_img.save(os.path.join(ASSETS_DIR, "red-chilli.png"))
print("Saved real photo red-chilli.png")

# 4. Masala / Kurra Karam (Rich red masala jar photo crop)
masala_crop = crop_center_square(jar_spice_src)
masala_img = adjust_color_balance(masala_crop, r_factor=1.15, g_factor=0.9, b_factor=0.82)
masala_img = ImageEnhance.Contrast(masala_img).enhance(1.15)
masala_img.save(os.path.join(ASSETS_DIR, "masala-karam.png"))
print("Saved real photo masala-karam.png")

# 5. Karivepaku Karam (Deep green curry leaf spice podi photo)
karivepaku_crop = crop_center_square(spices_src)
karivepaku_img = adjust_color_balance(karivepaku_crop, r_factor=0.6, g_factor=1.25, b_factor=0.65)
karivepaku_img = ImageEnhance.Color(karivepaku_img).enhance(1.3)
karivepaku_img.save(os.path.join(ASSETS_DIR, "karivepaku-karam.png"))
print("Saved real photo karivepaku-karam.png")

# 6. Munagaku Karam (Herbal green moringa leaf spice podi photo)
munagaku_crop = crop_center_square(spices_src)
munagaku_img = adjust_color_balance(munagaku_crop, r_factor=0.7, g_factor=1.3, b_factor=0.6)
munagaku_img = ImageEnhance.Color(munagaku_img).enhance(1.25)
munagaku_img.save(os.path.join(ASSETS_DIR, "munagaku-karam.png"))
print("Saved real photo munagaku-karam.png")

# 7. Kakarakaya Karam (Earthy roasted bitter gourd podi photo)
kakarakaya_k_crop = crop_center_square(spices_src)
kakarakaya_k_img = adjust_color_balance(kakarakaya_k_crop, r_factor=0.95, g_factor=0.85, b_factor=0.65)
kakarakaya_k_img = ImageEnhance.Contrast(kakarakaya_k_img).enhance(1.2)
kakarakaya_k_img.save(os.path.join(ASSETS_DIR, "kakarakaya-karam.png"))
print("Saved real photo kakarakaya-karam.png")

# 8. Nalla Karam / Idly Karam (Dark roasted podi photo)
nalla_crop = crop_center_square(jar_spice_src)
nalla_img = adjust_color_balance(nalla_crop, r_factor=0.75, g_factor=0.65, b_factor=0.6)
nalla_img = ImageEnhance.Contrast(nalla_img).enhance(1.3)
nalla_img.save(os.path.join(ASSETS_DIR, "nalla-karam.png"))
print("Saved real photo nalla-karam.png")

# 9. Cauliflower Pickle (Spicy red floret pickle photo)
cauli_crop = crop_center_square(tomato_src)
cauli_img = adjust_color_balance(cauli_crop, r_factor=1.1, g_factor=1.0, b_factor=0.85)
cauli_img.save(os.path.join(ASSETS_DIR, "cauliflower.png"))
print("Saved real photo cauliflower.png")

# 10. Kakarakaya Pickle (Bitter gourd pickle photo)
kakarakaya_p_crop = crop_center_square(gongura_src)
kakarakaya_p_img = adjust_color_balance(kakarakaya_p_crop, r_factor=1.05, g_factor=0.9, b_factor=0.75)
kakarakaya_p_img.save(os.path.join(ASSETS_DIR, "kakarakaya-pickle.png"))
print("Saved real photo kakarakaya-pickle.png")

# 11. Lemon Pickle (Citrus lemon pickle photo)
lemon_crop = crop_center_square(amla_src)
lemon_img = adjust_color_balance(lemon_crop, r_factor=1.15, g_factor=1.1, b_factor=0.65)
lemon_img = ImageEnhance.Color(lemon_img).enhance(1.3)
lemon_img.save(os.path.join(ASSETS_DIR, "lemon-pickle.png"))
print("Saved real photo lemon-pickle.png")

print("All real photo product assets built successfully!")
