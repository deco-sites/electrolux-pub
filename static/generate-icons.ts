import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.48/deno-dom-wasm.ts";
const svgFilePath = "static/sprites.svg";
const outputFilePath = "static/iconsMap.ts";

export async function getIconsMap(): Promise<Map<string, string>> {
    // Lê o arquivo SVG
    const svgContent = await Deno.readTextFile(svgFilePath);

    // Cria um Map para armazenar os símbolos
    const iconsMap = new Map<string, string>();

    // Cria um parser de DOM temporário
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, "text/html");

    // Encontra todos os elementos symbol
    const symbols = doc.querySelectorAll("symbol");

    // Itera sobre cada symbol e adiciona ao Map
    symbols.forEach((symbol) => {
        const id = symbol.getAttribute("id");
        if (id) {
            // Pega o conteúdo interno do symbol
            const symbolContent = symbol.outerHTML;
            iconsMap.set(id, symbolContent.replace(/symbol/g, "svg"));
        }
    });

    // Converte o Map para um objeto e escreve no arquivo
    const iconsObject = Object.fromEntries(iconsMap);
    const fileContent = `export const adminIcons = ${JSON.stringify(iconsObject, null, 2)};`;
    await Deno.writeTextFile(outputFilePath, fileContent);

    return iconsMap;
}

await getIconsMap();

