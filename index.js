import BaseModule from "./structures/BaseModule.js";

import fetch from "node-fetch";
import fs from "fs";
import gm from "gm";
import sharp from "sharp";

export default class HeavensDoor extends BaseModule {
  /**
   * @param {Main} main
   */
  constructor(main) {
    super(main);

    this.fs = fs;
    this.gm = gm.subClass({ imageMagick: true });
    this.sharp = sharp;

    this.register(HeavensDoor, {
      name: "heavensdoor",
    });
  }

  init() {
    this.modules.commandRegistrar.registerCommands('heavensdoor', import.meta.url);

    return true;
  }

  download(uri, filename) {
    return new Promise(async (resolve, reject) => {
      const res = await fetch(uri);
      const fileStream = fs.createWriteStream(filename);

      res.body.pipe(fileStream);
      res.body.on("error", reject);
      fileStream.on("finish", resolve);
    });
  }

  getAssetPath(name) {
    return process.cwd() + "src/modules/HeavensDoor/assets/images/" + name;
  }

  toPng(image) {
    return new Promise(async (resolve, reject) => {
      image.setFormat("png").toBuffer(function (error, stdout) {
        if (error) return reject(error);
        resolve(stdout);
      });
    });
  }

  matrixCalculator(corners, image) {
    const perspectiveMatrix = {
      tL: [0, 0, 0, 0],
      tR: [image.width, 0, 0, 0],
      bL: [0, image.height, 0, 0],
      bR: [image.width, image.height, 0, 0],
    };

    Object.entries(corners).forEach((corner) => {
      perspectiveMatrix[corner[0]][2] = corner[1].x;
      perspectiveMatrix[corner[0]][3] = corner[1].y;
    });

    return Object.values(perspectiveMatrix)
      .map((x) => x.join(","))
      .join(" ");
  }

  async generatePerspective(image, layer, corners) {
    const resizeOption = {
      position: "center",
      fit: "fill",
      height: layer.height,
      width: layer.width,
    };

    image = this.sharp(image).resize(resizeOption);

    const perpectiveMatrix = this.matrixCalculator(corners, layer);

    const distorted = this.gm(image)
      .out("-matte")
      .out("-virtual-pixel")
      .out("transparent")
      .out("-distort")
      .out("Perspective")
      .out(perpectiveMatrix);
    return this.toPng(distorted);
  }
}
