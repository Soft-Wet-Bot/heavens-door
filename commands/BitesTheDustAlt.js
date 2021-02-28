import HeavensDoor from '../structures/commands/HeavensDoor.js'

export default class BitesTheDustAlt extends HeavensDoor {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(BitesTheDustAlt, {
      category: category,

      name: 'heavens door bitesthedust2',
      aliases: ['btd2', 'bitesthedustalt'],
      description: 'Activate bites the dust alternate on an image',
      usage: 'heavens door bitesthedust [image resolvable]',
      params: [
        {
          name: 'image resolvable',
          description: 'A link, a mentioned user or url to an image.',
          type: 'string',
          default: "Takes the author's profile picture"
        }
      ],
      example: 'heavens door bitesthedust2'
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
      .resize({
        width: 768,
        height: 768,
        fit: 'outside',
        position: 'center',
        background: 'transparent'
      })
      .composite([
        {
          input: this.modules.heavensdoor.getAssetPath('bite2.png'),
          gravity: 'southwest'
        }
      ])
  }
}
