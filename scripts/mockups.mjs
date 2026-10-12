// Сжимает скриншоты приложения в webp под ширину страницы
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const dir = 'src/assets/mockups'
const files = (await readdir(dir)).filter(f => f.endsWith('.png'))

for (const file of files) {
	const out = path.join(dir, file.replace(/\.png$/, '.webp'))

	await sharp(path.join(dir, file))
		.resize({ width: 800, withoutEnlargement: true })
		.webp({ quality: 78 })
		.toFile(out)

	console.log(file, '→', path.basename(out))
}
