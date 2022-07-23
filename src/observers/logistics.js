export class Logistic {
    //each method should handle its own errors, since notifiers resonsability is only to emit event
    update({ id, userName }) {
        console.log(`[${userName}] order received as [${id}] will be shiped`)
    }
}