import BaseCommand from '../../../../structures/commands/BaseCommand.js'

export default class HeavensDoor extends BaseCommand {
  constructor(main) {
    super(main)

    this.fs = this.modules.heavensdoor.fs
    this.gm = this.modules.heavensdoor.gm
    this.sharp = this.modules.heavensdoor.sharp

    this.supportedFileTypes = ['.jpg', '.jpeg', '.png']
  }

  /**
   * @param {String} command String that triggered the request
   */
  async beforeRun() {
    this.textChannel.startTyping()

    const url = this.getUrl()
    const filename = `${process.cwd()}/src/modules/HeavensDoor/assets/temp/${this.user.id.toString(
      16
    )}_${Date.now().toString(16).substr(-6)}.jpg`

    try {
      await this.modules.heavensdoor.download(url, filename)
    } catch (e) {
      this.reply('[ERROR] Failed to download picture...')

      return false
    } finally {
      this.textChannel.stopTyping()
    }

    this.filename = filename

    return true
  }

  afterRun() {
    try {
      this.fs.unlinkSync(this.filename)
    } catch (e) {
      this.log('ERROR', 'HEAVENS', 'Failed to remove a file.')
    } finally {
      this.textChannel.stopTyping()
    }
    return true
  }

  getArgumentUrl() {
    if (this.args[0] && this.args[0].toLowerCase().startsWith('http')) {
      try {
        // Verify if the url is valid
        URL(this.args[0])

        return this.args[0]
      } catch (e) { }
    }
    return null
  }

  /**
   * @param {Array} types
   */
  getAttachmentOfType(types) {
    const attachment = this.msgObj.attachments.first()

    if (attachment) {
      for (let i = 0; i < types.length; i++) {
        if (attachment.url.toLowerCase().endsWith(types[i])) { return attachment.url }
      }
    }

    return null
  }

  getEmoji() {
    const temp = this.args[0]
    if (temp && temp.startsWith('<:') && temp.endsWith('>')) {
      const emojiId = temp.split(':')[2].slice(0, -1)
      return `https://cdn.discordapp.com/emojis/${emojiId}.png`
    }
    return null
  }

  getMentionAvatarUrl() {
    const member = this.msgObj.mentions.members.first()
    if (member) {
      return member.user.displayAvatarURL({ format: 'jpg', size: 512 })
    }
    return null
  }

  getUrl() {
    return (
      this.getAttachmentOfType(this.supportedFileTypes) ||
      this.getArgumentUrl() ||
      this.getMentionAvatarUrl() ||
      this.getEmoji() ||
      this.user.displayAvatarURL({ format: 'jpg', size: 512 })
    )
  }
}
