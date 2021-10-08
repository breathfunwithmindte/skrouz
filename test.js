const si = [
  "https://a.scdn.gr/images/sku_main_images/027650/27650414/large_20210316110335_samsung_galaxy_a32_4g_128gb_blue.jpeg",
  "https://d.scdn.gr/images/sku_main_images/023150/23150707/large_20200513130506_samsung_galaxy_s10_dual_128gb_prism_blue.jpeg"
]

const ni = [
  "https://d.scdn.gr/images/sku_main_images/029048/29048380/large_20210524100443_nokia_3_4_4gb_64gb_fjord.jpeg",
  "https://d.scdn.gr/images/sku_main_images/030231/30231452/large_20210727100209_nokia_g10_32gb_night.jpeg",
  "https://c.scdn.gr/images/sku_main_images/026049/26049436/large_20201204121816_nokia_2_4_32gb_blue.jpeg"
]

const ai = [
  "https://a.scdn.gr/images/sku_main_images/023138/23138536/large_20200512142346_apple_iphone_xr_64gb_blue.jpeg",
  "https://a.scdn.gr/images/sku_main_images/023138/23138643/xlarge_20200512143201_apple_iphone_xr_64gb_black.jpeg"
]

const prod = [
  {
    marka: 'samsung',
    imgs: si
  },
  {
    marka: 'nokia',
    imgs: ni
  },
  {
    marka: 'apple',
    imgs: ai
  }
]

const rams = [1,2,4,6,8,16,32,64];
const xwrhtikotita = [28,56,92,128,256,300,512];

function generaterandomproducts (limit) {
  let p = [];
  
  for (let i = 0; i < limit; i++) {
    const testone = prod[rn(0,2)]
    const randomram = rams[rn(0,7)]
    const randomxwri = xwrhtikotita[rn(0,7)]
    p.push({
      title: testone.marka + `~ ram: ${randomram}, ~χωρητικότητα: ${randomxwri} και κωδικός:` + require("nanoid").nanoid(8),
      kataskeuastes: testone.marka,
      images: testone.imgs[ testone.marka === "nokia" ? rn(0,2) : rn(0,1)],
      RAM: randomram,
      xwrhtikotita: randomxwri
    })
  }
  return p;
}

module.exports = generaterandomproducts;

function rn(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

