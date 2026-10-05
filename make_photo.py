"""
Generates a professional corporate headshot portrait saved as assets/profile.jpg
Matches: black blazer, white dress shirt, blurred office/glass background,
         dark hair (wavy), beard, warm skin tone — professional LinkedIn style.
"""
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
import os, math

OUT = r"c:\portfolo_web _site\assets\profile.jpg"
os.makedirs(os.path.dirname(OUT), exist_ok=True)

W, H = 600, 750

img = Image.new("RGB", (W, H), (180, 195, 210))
draw = ImageDraw.Draw(img)

# ── Blurred office background ─────────────────────────────────────
# Sky/window area (right side - bluish)
for y in range(H):
    ratio = y / H
    r = int(160 + ratio * 20)
    g = int(175 + ratio * 15)
    b = int(195 + ratio * 10)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# Left blurred greenery patch
draw.ellipse([-60, 80, 200, 400], fill=(100, 150, 100))
draw.ellipse([-40, 120, 160, 360], fill=(130, 170, 110))
draw.ellipse([-20, 160, 130, 320], fill=(150, 185, 125))

# Right window/glass columns (vertical light strips)
draw.rectangle([370, 0, 420, 300], fill=(185, 205, 225))
draw.rectangle([440, 0, 490, 300], fill=(175, 198, 220))
draw.rectangle([510, 0, 560, 300], fill=(180, 202, 222))

# Blur background
img = img.filter(ImageFilter.GaussianBlur(radius=18))
draw = ImageDraw.Draw(img)

# ── Suit/body (dark charcoal/black blazer) ───────────────────────
suit_dark = (28, 28, 32)
suit_mid  = (38, 38, 44)

# Body mass
draw.ellipse([-80, 550, 680, 900], fill=suit_dark)
draw.ellipse([-60, 530, 320, 820], fill=suit_dark)  # left shoulder
draw.ellipse([280, 530, 660, 820], fill=suit_dark)  # right shoulder

# Blazer lapels
draw.polygon([(210,460),(300,530),(230,750),(80,750),(50,600)], fill=suit_mid)
draw.polygon([(390,460),(300,530),(370,750),(520,750),(550,600)], fill=suit_mid)

# White shirt/collar showing in V
shirt_white = (240, 238, 235)
draw.polygon([(255,455),(300,510),(345,455),(340,430),(300,490),(260,430)], fill=shirt_white)
draw.rectangle([270,490,330,600], fill=shirt_white)

# Shirt collar
draw.polygon([(258,432),(300,480),(258,470),(245,445)], fill=(225,222,218))
draw.polygon([(342,432),(300,480),(342,470),(355,445)], fill=(220,218,215))

# Blazer shadow/detail
draw.line([(210,460),(100,750)], fill=(18,18,22), width=4)
draw.line([(390,460),(500,750)], fill=(18,18,22), width=4)

# ── Neck ─────────────────────────────────────────────────────────
neck_c = (190, 145, 105)
draw.ellipse([258, 420, 342, 520], fill=neck_c)

# ── Head/face ────────────────────────────────────────────────────
skin_base   = (200, 155, 112)
skin_shadow = (175, 130, 90)
skin_light  = (215, 168, 122)

# Head shape (slightly oval)
draw.ellipse([145, 100, 455, 470], fill=skin_base)

# Cheek highlights
draw.ellipse([155, 230, 255, 340], fill=skin_light)
draw.ellipse([345, 230, 445, 340], fill=skin_light)

# Temple shadow
draw.ellipse([145, 180, 220, 320], fill=skin_shadow)
draw.ellipse([380, 180, 455, 320], fill=skin_shadow)

# Jawline definition
draw.arc([155, 340, 445, 500], 10, 170, fill=skin_shadow, width=8)

# ── Ears ─────────────────────────────────────────────────────────
draw.ellipse([138, 240, 175, 310], fill=skin_base)
draw.ellipse([425, 240, 462, 310], fill=skin_base)
draw.ellipse([144, 248, 168, 302], fill=skin_shadow)
draw.ellipse([432, 248, 456, 302], fill=skin_shadow)

# ── Hair (dark black, wavy/full) ─────────────────────────────────
hair_c = (15, 10, 8)
hair_h = (35, 25, 18)  # subtle highlight

# Main hair mass
draw.ellipse([148, 60, 452, 230], fill=hair_c)
# Sides
draw.ellipse([145, 130, 220, 280], fill=hair_c)
draw.ellipse([380, 130, 455, 280], fill=hair_c)
# Hair cuts into forehead naturally
draw.ellipse([185, 130, 415, 220], fill=skin_base)  # forehead exposed
draw.ellipse([175, 110, 425, 195], fill=hair_c)       # hairline re-added

# Hair texture/waves
for i in range(6):
    x = 165 + i * 45
    draw.arc([x, 65, x+70, 130], 200, 340, fill=hair_h, width=3)

# Hair highlight (center parting-ish)
draw.arc([220, 70, 380, 150], 200, 340, fill=hair_h, width=5)

# ── Eyebrows (dark, defined) ─────────────────────────────────────
eb = (22, 14, 8)
draw.arc([178, 195, 275, 232], 195, 350, fill=eb, width=8)
draw.arc([325, 195, 422, 232], 195, 350, fill=eb, width=8)

# ── Eyes ─────────────────────────────────────────────────────────
eye_white = (242, 238, 232)
iris_c    = (55, 35, 18)
pupil_c   = (12, 7, 3)

# Left eye
draw.ellipse([185, 242, 268, 282], fill=eye_white)
draw.ellipse([208, 245, 252, 279], fill=iris_c)
draw.ellipse([218, 252, 242, 273], fill=pupil_c)
draw.ellipse([236, 250, 244, 257], fill=(255,255,255))
# Lids
draw.arc([185, 242, 268, 282], 195, 355, fill=(30,18,10), width=3)
draw.arc([185, 252, 268, 290], 5,  170, fill=(60,35,20), width=2)

# Right eye
draw.ellipse([332, 242, 415, 282], fill=eye_white)
draw.ellipse([355, 245, 399, 279], fill=iris_c)
draw.ellipse([365, 252, 389, 273], fill=pupil_c)
draw.ellipse([383, 250, 391, 257], fill=(255,255,255))
# Lids
draw.arc([332, 242, 415, 282], 195, 355, fill=(30,18,10), width=3)
draw.arc([332, 252, 415, 290], 5,  170, fill=(60,35,20), width=2)

# ── Nose ─────────────────────────────────────────────────────────
nose_s = (165, 120, 82)
draw.ellipse([278, 290, 322, 360], fill=nose_s)
draw.ellipse([262, 348, 295, 376], fill=nose_s)
draw.ellipse([305, 348, 338, 376], fill=nose_s)
draw.ellipse([282, 360, 318, 380], fill=(150,108,72))

# ── Lips ─────────────────────────────────────────────────────────
lip_up  = (155, 95, 72)
lip_low = (140, 80, 60)
draw.arc([252, 380, 348, 415], 5,  175, fill=lip_up,  width=5)
draw.arc([255, 390, 345, 430], 190, 355, fill=lip_low, width=4)
draw.line([(252,400),(348,400)], fill=(120,65,50), width=2)

# ── Beard & Mustache (neat, trimmed) ─────────────────────────────
beard_c = (20, 12, 7)

# Mustache (thin, above lip)
draw.arc([255, 368, 345, 398], 5, 175, fill=beard_c, width=6)

# Chin beard (neat, not full)
draw.ellipse([248, 408, 352, 478], fill=beard_c)
draw.ellipse([262, 418, 338, 468], fill=skin_base)  # cut center lighter

# Cheek beard (patchy/stubble along jaw)
# Left cheek
draw.arc([165, 330, 268, 450], 120, 200, fill=beard_c, width=8)
draw.arc([170, 360, 260, 455], 130, 195, fill=beard_c, width=5)
# Right cheek
draw.arc([332, 330, 435, 450], 345, 60, fill=beard_c, width=8)
draw.arc([340, 360, 430, 455], 345, 50, fill=beard_c, width=5)

# Sideburns
draw.rectangle([155, 255, 180, 370], fill=beard_c)
draw.rectangle([420, 255, 445, 370], fill=beard_c)

# Refine beard blend
draw.ellipse([225, 430, 275, 468], fill=beard_c)
draw.ellipse([325, 430, 375, 468], fill=beard_c)
draw.ellipse([255, 450, 345, 485], fill=beard_c)

# ── Smooth & enhance ─────────────────────────────────────────────
img = img.filter(ImageFilter.SMOOTH_MORE)
img = img.filter(ImageFilter.SMOOTH)

e1 = ImageEnhance.Contrast(img)
img = e1.enhance(1.18)
e2 = ImageEnhance.Brightness(img)
img = e2.enhance(1.06)
e3 = ImageEnhance.Sharpness(img)
img = e3.enhance(1.3)
e4 = ImageEnhance.Color(img)
img = e4.enhance(1.1)

img.save(OUT, "JPEG", quality=96, optimize=True)
size_kb = os.path.getsize(OUT) / 1024
print(f"SUCCESS: Saved to {OUT}  ({size_kb:.1f} KB)")
