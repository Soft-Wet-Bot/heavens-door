import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class Medic extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Medic, {
      category: category,

      name: 'heavens door medic',
      aliases: ['medick'],
      description: 'Medic is dissapointed at your image',
      usage: 'heavens door medic [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'image_resolvable',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door medic'
    })
  }

  /**
   * @param {string} command string representing what triggered the command
   */
  async run(command) {
    try {
      const out = await this.modifyImage()

      await this.send("**Heaven's Door**", {
        files: [
          {
            attachment: out,
            name: `${this.name}.png`
          }
        ]
      })
    } catch (e) {
      this.send(
        'Unknown error occured, notify the creator of the bot if this persists:\n' +
        e.stack
      )
    }

    return true
  }

  modifyImage() {
    return this.sharp(this.filename)
      .resize({ width: 399, height: 390, fit: 'fill', position: 'center' })
      .extend({ top: 0, bottom: 387, left: 446, right: 0, background: 'black' })
      .composite([
        {
          input: this.modules.heavensdoor.getAssetPath('medic.png'),
          gravity: 'south'
        }
      ])
  }
}
