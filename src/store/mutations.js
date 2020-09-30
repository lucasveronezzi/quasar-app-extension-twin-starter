export function incLoadingPage (state) {
  state.loadingPage++
}

export function decLoadingPage (state) {
  if (state.loadingPage > 0) { state.loadingPage-- }
}
