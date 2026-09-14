import os
import math
import random
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

OUTPUT_DIR = r"d:\s2k\soil-to-soul\src\assets"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def create_base_canvas(bg_type="wood"):
    img = Image.new("RGB", (800, 800), "#1c140e")
    draw = ImageDraw.Draw(img)
    
    if bg_type == "wood":
        # Rich warm wooden table texture background
        for y in range(800):
            r = int(45 + 15 * math.sin(y / 40.0) + (y / 800.0) * 10)
            g = int(28 + 10 * math.sin(y / 40.0) + (y / 800.0) * 8)
            b = int(18 + 5 * math.sin(y / 40.0))
            draw.line([(0, y), (800, y)], fill=(r, g, b))
        # Wood grain lines
        for _ in range(60):
            gy = random.randint(0, 800)
            gh = random.randint(1, 3)
            alpha = random.randint(15, 45)
            draw.rectangle([0, gy, 800, gy + gh], fill=(20, 10, 5, alpha))
            
    elif bg_type == "slate":
        # Dark rustic stone / slate background
        for y in range(800):
            v = int(30 + random.randint(-5, 5) + (y / 800.0) * 15)
            draw.line([(0, y), (800, y)], fill=(v, v + 2, v + 4))
            
    elif bg_type == "warm_kitchen":
        # Warm ambient kitchen lighting
        for y in range(800):
            r = int(55 - (y / 800.0) * 20)
            g = int(40 - (y / 800.0) * 18)
            b = int(28 - (y / 800.0) * 12)
            draw.line([(0, y), (800, y)], fill=(max(0, r), max(0, g), max(0, b)))
            
    # Soft vignette overlay
    vignette = Image.new("RGBA", (800, 800), (0, 0, 0, 0))
    vdraw = ImageDraw.Draw(vignette)
    for r in range(400, 600, 10):
        alpha = int(((r - 400) / 200.0) ** 2 * 160)
        vdraw.ellipse([400 - r, 400 - r, 400 + r, 400 + r], outline=(10, 5, 0, alpha), width=15)
    img = Image.alpha_composite(img.convert("RGBA"), vignette).convert("RGB")
    return img

def draw_shadow(draw, cx, cy, rx, ry, opacity=120):
    shadow = Image.new("RGBA", (800, 800), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=(0, 0, 0, opacity))
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=25))
    return shadow

def draw_glass_jar(canvas, cx, cy, contents_drawer, cap_color="#1f3a2c"):
    # Glass Jar with specular reflections
    # Add shadow
    shadow = draw_shadow(None, cx, cy + 230, 210, 55, 140)
    canvas = Image.alpha_composite(canvas.convert("RGBA"), shadow)
    
    jar_layer = Image.new("RGBA", (800, 800), (0, 0, 0, 0))
    jdraw = ImageDraw.Draw(jar_layer)
    
    # Jar Body Outer Wall
    jdraw.rounded_rectangle([cx - 180, cy - 160, cx + 180, cy + 220], radius=40, fill=(240, 245, 240, 30), outline=(200, 220, 210, 120), width=4)
    
    # Draw Inner Contents inside jar bounding box
    contents_img = Image.new("RGBA", (800, 800), (0, 0, 0, 0))
    cdraw = ImageDraw.Draw(contents_img)
    contents_drawer(cdraw, cx, cy)
    
    # Create mask for jar body
    mask = Image.new("L", (800, 800), 0)
    mdraw = ImageDraw.Draw(mask)
    mdraw.rounded_rectangle([cx - 174, cy - 150, cx + 174, cy + 214], radius=35, fill=255)
    
    # Composite contents with mask
    canvas.paste(contents_img, (0, 0), mask)
    
    # Jar Glass Reflections & Highlights
    jdraw.line([(cx - 160, cy - 130), (cx - 160, cy + 190)], fill=(255, 255, 255, 130), width=6)
    jdraw.line([(cx - 148, cy - 130), (cx - 148, cy + 180)], fill=(255, 255, 255, 60), width=3)
    jdraw.line([(cx + 160, cy - 130), (cx + 160, cy + 190)], fill=(255, 255, 255, 90), width=4)
    
    # Jar Neck
    jdraw.rectangle([cx - 140, cy - 200, cx + 140, cy - 160], fill=(220, 230, 225, 60), outline=(190, 210, 200, 140), width=3)
    
    # Jar Cap Lid
    jdraw.rounded_rectangle([cx - 155, cy - 230, cx + 155, cy - 195], radius=12, fill=cap_color, outline="#d4af37", width=3)
    # Cap highlight
    jdraw.line([(cx - 130, cy - 222), (cx + 130, cy - 222)], fill=(255, 255, 255, 70), width=2)
    
    canvas = Image.alpha_composite(canvas, jar_layer)
    return canvas.convert("RGB")

def draw_ceramic_bowl(canvas, cx, cy, contents_drawer, bowl_color="#2b201a", rim_color="#d4af37"):
    shadow = draw_shadow(None, cx, cy + 140, 240, 60, 150)
    canvas = Image.alpha_composite(canvas.convert("RGBA"), shadow)
    
    bowl_layer = Image.new("RGBA", (800, 800), (0, 0, 0, 0))
    bdraw = ImageDraw.Draw(bowl_layer)
    
    # Bowl Body
    bdraw.ellipse([cx - 240, cy - 100, cx + 240, cy + 200], fill=bowl_color, outline=rim_color, width=5)
    
    # Draw Inner Contents inside top rim ellipse
    contents_img = Image.new("RGBA", (800, 800), (0, 0, 0, 0))
    cdraw = ImageDraw.Draw(contents_img)
    contents_drawer(cdraw, cx, cy)
    
    mask = Image.new("L", (800, 800), 0)
    mdraw = ImageDraw.Draw(mask)
    mdraw.ellipse([cx - 232, cy - 95, cx + 232, cy + 185], fill=255)
    
    canvas.paste(contents_img, (0, 0), mask)
    
    # Bowl Rim highlight
    bdraw.ellipse([cx - 238, cy - 98, cx + 238, cy + 40], outline=rim_color, width=4)
    bdraw.arc([cx - 238, cy - 98, cx + 238, cy + 40], 190, 350, fill=(255, 255, 255, 120), width=3)
    
    canvas = Image.alpha_composite(canvas, bowl_layer)
    return canvas.convert("RGB")


# ==========================================
# 1. CAULIFLOWER PICKLE
# ==========================================
def generate_cauliflower_pickle():
    base = create_base_canvas("wood")
    
    def fill_cauliflower(cdraw, cx, cy):
        # Rich spicy red pickle oil base
        cdraw.rectangle([cx - 175, cy - 150, cx + 175, cy + 215], fill="#8b1e0f")
        
        # Cauliflower florets in pickle oil
        random.seed(42)
        for _ in range(35):
            fx = cx + random.randint(-140, 140)
            fy = cy + random.randint(-120, 180)
            fr = random.randint(18, 32)
            # Florets: Creamy ivory stained with red chilli oil
            floret_col = random.choice(["#e6c8a2", "#d9a779", "#cc8b54", "#f2dfc4", "#b34227"])
            # Cluster bumps for cauliflower floret texture
            for dx, dy in [(-8, -8), (8, -8), (-8, 8), (8, 8), (0, 0)]:
                cdraw.ellipse([fx + dx - fr//2, fy + dy - fr//2, fx + dx + fr//2, fy + dy + fr//2], fill=floret_col)
            # Red chilli flakes & mustard seeds
            cdraw.ellipse([fx - 3, fy - 3, fx + 3, fy + 3], fill="#5c0000")
            cdraw.ellipse([fx + 5, fy + 2, fx + 8, fy + 5], fill="#e6b800")
            
        # Curry leaves in oil
        for _ in range(8):
            lx = cx + random.randint(-120, 120)
            ly = cy + random.randint(-100, 160)
            cdraw.ellipse([lx - 16, ly - 6, lx + 16, ly + 6], fill="#2d4d1e")
            
    img = draw_glass_jar(base, 400, 420, fill_cauliflower, cap_color="#1f3a2c")
    img.save(os.path.join(OUTPUT_DIR, "cauliflower.png"))
    print("Generated cauliflower.png")


# ==========================================
# 2. KAKARAKAYA PICKLE (Bitter Gourd)
# ==========================================
def generate_kakarakaya_pickle():
    base = create_base_canvas("warm_kitchen")
    
    def fill_kakarakaya(cdraw, cx, cy):
        # Dark spicy red jaggery tamarind pickle sauce
        cdraw.rectangle([cx - 175, cy - 150, cx + 175, cy + 215], fill="#691509")
        
        random.seed(101)
        # Bitter gourd ring slices
        for _ in range(28):
            bx = cx + random.randint(-135, 135)
            by = cy + random.randint(-120, 180)
            brx = random.randint(22, 38)
            bry = random.randint(14, 24)
            # Outer dark green skin ring
            cdraw.ellipse([bx - brx, by - bry, bx + brx, by + bry], fill="#233814", outline="#4a6b29", width=4)
            # Inner fried seeds/core
            cdraw.ellipse([bx - brx + 8, by - bry + 5, bx + brx - 8, by + bry - 5], fill="#803517")
            # Seeds
            cdraw.ellipse([bx - 4, by - 3, bx + 4, by + 3], fill="#d1a054")
            
    img = draw_glass_jar(base, 400, 420, fill_kakarakaya, cap_color="#1f3a2c")
    img.save(os.path.join(OUTPUT_DIR, "kakarakaya-pickle.png"))
    print("Generated kakarakaya-pickle.png")


# ==========================================
# 3. LEMON PICKLE
# ==========================================
def generate_lemon_pickle():
    base = create_base_canvas("slate")
    
    def fill_lemon(cdraw, cx, cy):
        # Tangy red-amber oil base
        cdraw.rectangle([cx - 175, cy - 150, cx + 175, cy + 215], fill="#9e2b13")
        
        random.seed(77)
        # Lemon quarters / pieces
        for _ in range(26):
            lx = cx + random.randint(-130, 130)
            ly = cy + random.randint(-120, 180)
            lr = random.randint(24, 38)
            # Golden amber yellow lemon skin & pulp with red spice stain
            col = random.choice(["#d49b13", "#e6b022", "#b8700f", "#8a240d", "#f2c73b"])
            cdraw.pieslice([lx - lr, ly - lr, lx + lr, ly + lr], random.randint(0, 90), random.randint(180, 270), fill=col, outline="#591404", width=2)
            # Mustard seeds
            for _ in range(3):
                mx = lx + random.randint(-10, 10)
                my = ly + random.randint(-10, 10)
                cdraw.ellipse([mx - 2, my - 2, mx + 2, my + 2], fill="#e0ad1b")
                
    img = draw_glass_jar(base, 400, 420, fill_lemon, cap_color="#1f3a2c")
    img.save(os.path.join(OUTPUT_DIR, "lemon-pickle.png"))
    print("Generated lemon-pickle.png")


# ==========================================
# 4. NALLA KARAM / IDLY KARAM (Dark Roasted Podi)
# ==========================================
def generate_nalla_karam():
    base = create_base_canvas("wood")
    
    def fill_nalla_podi(cdraw, cx, cy):
        # Dark roasted black gram & chilli podi texture
        random.seed(88)
        for y in range(cy - 90, cy + 180):
            for x in range(cx - 230, cx + 230):
                if ((x - cx)**2 / 230**2 + (y - cy)**2 / 140**2) <= 1.0:
                    r = random.randint(45, 80)
                    g = random.randint(25, 45)
                    b = random.randint(15, 30)
                    # Occasional garlic/lentil specs
                    if random.random() < 0.04:
                        r, g, b = random.randint(140, 190), random.randint(110, 150), random.randint(60, 90)
                    cdraw.point((x, y), fill=(r, g, b))
                    
        # Central mound of podi
        cdraw.ellipse([cx - 160, cy - 80, cx + 160, cy + 60], fill="#3d1e11")
        for _ in range(800):
            px = cx + int(random.gauss(0, 60))
            py = cy - 20 + int(random.gauss(0, 30))
            col = random.choice(["#4a2515", "#2e140a", "#63351d", "#8c4f2b", "#1a0904"])
            cdraw.ellipse([px-2, py-2, px+2, py+2], fill=col)
            
    img = draw_ceramic_bowl(base, 400, 450, fill_nalla_podi, bowl_color="#1a120c", rim_color="#b8860b")
    img.save(os.path.join(OUTPUT_DIR, "nalla-karam.png"))
    print("Generated nalla-karam.png")


# ==========================================
# 5. KARIVEPAKU KARAM (Curry Leaf Podi)
# ==========================================
def generate_karivepaku_karam():
    base = create_base_canvas("warm_kitchen")
    
    def fill_karivepaku(cdraw, cx, cy):
        # Deep green curry leaf podi
        random.seed(55)
        for y in range(cy - 90, cy + 180):
            for x in range(cx - 230, cx + 230):
                if ((x - cx)**2 / 230**2 + (y - cy)**2 / 140**2) <= 1.0:
                    g = random.randint(60, 110)
                    r = random.randint(30, 65)
                    b = random.randint(15, 35)
                    cdraw.point((x, y), fill=(r, g, b))
                    
        # Heap mound in middle
        for _ in range(1200):
            px = cx + int(random.gauss(0, 70))
            py = cy - 20 + int(random.gauss(0, 35))
            col = random.choice(["#2d521e", "#1b3810", "#3d6929", "#4f8237", "#694d21"])
            cdraw.ellipse([px-2, py-2, px+2, py+2], fill=col)
            
        # Fresh green curry leaf garnish on top
        for angle in [0, 45, 120, 200, 280]:
            lx = cx + int(40 * math.cos(math.radians(angle)))
            ly = cy - 30 + int(20 * math.sin(math.radians(angle)))
            cdraw.ellipse([lx - 18, ly - 8, lx + 18, ly + 8], fill="#316120", outline="#1a3b10", width=1)
            cdraw.line([(lx - 14, ly), (lx + 14, ly)], fill="#539439", width=1)
            
    img = draw_ceramic_bowl(base, 400, 450, fill_karivepaku, bowl_color="#172113", rim_color="#d4af37")
    img.save(os.path.join(OUTPUT_DIR, "karivepaku-karam.png"))
    print("Generated karivepaku-karam.png")


# ==========================================
# 6. MUNAGAKU KARAM (Moringa Leaf Podi)
# ==========================================
def generate_munagaku_karam():
    base = create_base_canvas("wood")
    
    def fill_munagaku(cdraw, cx, cy):
        # Herbal bright olive-green moringa podi
        random.seed(99)
        for y in range(cy - 90, cy + 180):
            for x in range(cx - 230, cx + 230):
                if ((x - cx)**2 / 230**2 + (y - cy)**2 / 140**2) <= 1.0:
                    g = random.randint(80, 130)
                    r = random.randint(50, 90)
                    b = random.randint(20, 45)
                    cdraw.point((x, y), fill=(r, g, b))
                    
        # Central mound
        for _ in range(1000):
            px = cx + int(random.gauss(0, 65))
            py = cy - 20 + int(random.gauss(0, 30))
            col = random.choice(["#476926", "#344f19", "#5e8c33", "#74a840", "#94762d"])
            cdraw.ellipse([px-2, py-2, px+2, py+2], fill=col)
            
    img = draw_ceramic_bowl(base, 400, 450, fill_munagaku, bowl_color="#1c2414", rim_color="#d4af37")
    img.save(os.path.join(OUTPUT_DIR, "munagaku-karam.png"))
    print("Generated munagaku-karam.png")


# ==========================================
# 7. KAKARAKAYA KARAM (Bitter Gourd Podi)
# ==========================================
def generate_kakarakaya_karam():
    base = create_base_canvas("slate")
    
    def fill_kakarakaya_podi(cdraw, cx, cy):
        # Earthy brown roasted bitter gourd podi
        random.seed(33)
        for y in range(cy - 90, cy + 180):
            for x in range(cx - 230, cx + 230):
                if ((x - cx)**2 / 230**2 + (y - cy)**2 / 140**2) <= 1.0:
                    r = random.randint(70, 110)
                    g = random.randint(45, 75)
                    b = random.randint(20, 40)
                    cdraw.point((x, y), fill=(r, g, b))
                    
        for _ in range(1000):
            px = cx + int(random.gauss(0, 65))
            py = cy - 20 + int(random.gauss(0, 30))
            col = random.choice(["#5c3718", "#3d220d", "#7a4c24", "#9c6533", "#30421d"])
            cdraw.ellipse([px-2, py-2, px+2, py+2], fill=col)
            
    img = draw_ceramic_bowl(base, 400, 450, fill_kakarakaya_podi, bowl_color="#211812", rim_color="#b8860b")
    img.save(os.path.join(OUTPUT_DIR, "kakarakaya-karam.png"))
    print("Generated kakarakaya-karam.png")


# ==========================================
# 8. MASALA / KURRA KARAM (Rich Red Guntur Masala Chilli Powder)
# ==========================================
def generate_masala_karam():
    base = create_base_canvas("wood")
    
    def fill_masala_karam(cdraw, cx, cy):
        # Deep vibrant red masala chilli powder
        cdraw.rectangle([cx - 175, cy - 150, cx + 175, cy + 215], fill="#9e190b")
        random.seed(12)
        for _ in range(1500):
            px = cx + random.randint(-165, 165)
            py = cy + random.randint(-140, 200)
            col = random.choice(["#b81d0d", "#821105", "#d62b18", "#700c02", "#b3420f"])
            cdraw.ellipse([px-2, py-2, px+2, py+2], fill=col)
            
    img = draw_glass_jar(base, 400, 420, fill_masala_karam, cap_color="#1f3a2c")
    img.save(os.path.join(OUTPUT_DIR, "masala-karam.png"))
    print("Generated masala-karam.png")


# ==========================================
# 9. RED CHILLI POWDER
# ==========================================
def generate_red_chilli():
    base = create_base_canvas("warm_kitchen")
    
    def fill_red_chilli(cdraw, cx, cy):
        # Fiery bright red chilli powder
        random.seed(64)
        for y in range(cy - 90, cy + 180):
            for x in range(cx - 230, cx + 230):
                if ((x - cx)**2 / 230**2 + (y - cy)**2 / 140**2) <= 1.0:
                    r = random.randint(170, 230)
                    g = random.randint(25, 55)
                    b = random.randint(15, 35)
                    cdraw.point((x, y), fill=(r, g, b))
                    
        for _ in range(1200):
            px = cx + int(random.gauss(0, 70))
            py = cy - 20 + int(random.gauss(0, 35))
            col = random.choice(["#d62211", "#ab1303", "#f03824", "#820a00", "#e34b12"])
            cdraw.ellipse([px-2, py-2, px+2, py+2], fill=col)
            
    img = draw_ceramic_bowl(base, 400, 450, fill_red_chilli, bowl_color="#2b1411", rim_color="#d4af37")
    img.save(os.path.join(OUTPUT_DIR, "red-chilli.png"))
    print("Generated red-chilli.png")


# ==========================================
# 10. TURMERIC POWDER
# ==========================================
def generate_turmeric_powder():
    base = create_base_canvas("wood")
    
    def fill_turmeric(cdraw, cx, cy):
        # Pure vibrant golden-yellow turmeric powder
        random.seed(21)
        for y in range(cy - 90, cy + 180):
            for x in range(cx - 230, cx + 230):
                if ((x - cx)**2 / 230**2 + (y - cy)**2 / 140**2) <= 1.0:
                    r = random.randint(210, 255)
                    g = random.randint(160, 205)
                    b = random.randint(10, 35)
                    cdraw.point((x, y), fill=(r, g, b))
                    
        for _ in range(1200):
            px = cx + int(random.gauss(0, 70))
            py = cy - 20 + int(random.gauss(0, 35))
            col = random.choice(["#e6ab09", "#f7c419", "#cc9204", "#ffdb38", "#b87f00"])
            cdraw.ellipse([px-2, py-2, px+2, py+2], fill=col)
            
    img = draw_ceramic_bowl(base, 400, 450, fill_turmeric, bowl_color="#291e0d", rim_color="#d4af37")
    img.save(os.path.join(OUTPUT_DIR, "turmeric-powder.png"))
    print("Generated turmeric-powder.png")


# ==========================================
# 11. DHANIYA POWDER (Coriander)
# ==========================================
def generate_dhaniya_powder():
    base = create_base_canvas("slate")
    
    def fill_dhaniya(cdraw, cx, cy):
        # Warm citrusy brown coriander seed powder
        random.seed(84)
        for y in range(cy - 90, cy + 180):
            for x in range(cx - 230, cx + 230):
                if ((x - cx)**2 / 230**2 + (y - cy)**2 / 140**2) <= 1.0:
                    r = random.randint(140, 185)
                    g = random.randint(110, 150)
                    b = int(r * 0.45)
                    cdraw.point((x, y), fill=(r, g, b))
                    
        for _ in range(1200):
            px = cx + int(random.gauss(0, 70))
            py = cy - 20 + int(random.gauss(0, 35))
            col = random.choice(["#a88144", "#c49a56", "#87642d", "#dbb36e", "#6b4d1f"])
            cdraw.ellipse([px-2, py-2, px+2, py+2], fill=col)
            
        # Whole coriander seed accents on top
        for _ in range(15):
            sx = cx + random.randint(-80, 80)
            sy = cy - 20 + random.randint(-40, 40)
            cdraw.ellipse([sx - 5, sy - 4, sx + 5, sy + 4], fill="#d1ab6b", outline="#6e5223", width=1)
            cdraw.line([(sx - 4, sy), (sx + 4, sy)], fill="#a68046", width=1)
            
    img = draw_ceramic_bowl(base, 400, 450, fill_dhaniya, bowl_color="#241d14", rim_color="#d4af37")
    img.save(os.path.join(OUTPUT_DIR, "dhaniya-powder.png"))
    print("Generated dhaniya-powder.png")

if __name__ == "__main__":
    generate_cauliflower_pickle()
    generate_kakarakaya_pickle()
    generate_lemon_pickle()
    generate_nalla_karam()
    generate_karivepaku_karam()
    generate_munagaku_karam()
    generate_kakarakaya_karam()
    generate_masala_karam()
    generate_red_chilli()
    generate_turmeric_powder()
    generate_dhaniya_powder()
    print("All 11 product assets created successfully!")
