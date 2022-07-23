export class Logistic {
  //each method should handle its own errors, since notifiers resonsability is only to emit event
  update({ id, userName }) {
    console.log(`[${userName}] order [${id}] will be shiped`)
  }
}
