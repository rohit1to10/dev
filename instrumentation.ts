export async function register() {
  if (
    typeof localStorage === 'undefined' ||
    typeof localStorage.getItem !== 'function'
  ) {
    const store = new Map<string, string>()
    ;(global as unknown as Record<string, unknown>).localStorage = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => store.set(key, value),
      removeItem: (key: string) => store.delete(key),
      clear: () => store.clear(),
      key: (index: number) => Array.from(store.keys())[index] ?? null,
      get length() {
        return store.size
      },
    }
  }
}
