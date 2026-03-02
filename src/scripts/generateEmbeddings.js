import { pipeline } from '@xenova/transformers';
import fs from 'fs';
import path from 'path';


const root = process.cwd();


const inputPath = path.join(root, "src", "data", "portfolio-data.json");
const outputPath = path.join(root, "src", "data", "vectors.json");

const embedder = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2"
);

// read portfolio data
const data = JSON.parse(
  fs.readFileSync(inputPath, "utf-8")
);

for (let item of data) {
  const output = await embedder(item.text, {
    pooling: "mean",
    normalize: true
  });

  item.embedding = Array.from(output.data);
}

// save vectors
fs.writeFileSync(
  outputPath,
  JSON.stringify(data, null, 2)
);

console.log("Embeddings generated successfully ");