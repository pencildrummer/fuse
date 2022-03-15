import signale from "signale";

export const logger = new signale.Signale({
  types: {
    ready: {
      badge: '🚀',
      label: 'ready',
      color: 'greenBright',
    }
  }
})