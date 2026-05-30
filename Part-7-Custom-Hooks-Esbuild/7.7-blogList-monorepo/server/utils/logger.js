const info = (...params) => {
  console.log(...params)
}

const panic = (...params) => {
  console.error(...params)
}

export { info, panic }