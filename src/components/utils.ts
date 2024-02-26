export let TEST: any = {}

export function onRender(_id: any, phase: any, actualDuration: any) {
    if (phase === "update") {
        if (!TEST[_id]) {
            TEST[_id] = { times: [], rerendered: false, slowest: -1}
        }
        if (TEST[_id].slowest < actualDuration) {
            TEST[_id].slowest = actualDuration
        }
        
        TEST[_id].times.push(actualDuration)

    }
  }

  export function markIdAsRendered(id: string) {
    if (!TEST[id]) {
        TEST[id] = { times: [], rerendered: false, slowest: -1}
    }

    TEST[id].rerendered = true
  }
  export function reset() {
    TEST = {}
  }