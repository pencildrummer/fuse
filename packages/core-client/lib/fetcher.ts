export function fetcher(url, opts) {
  return fetch(url, opts).then(res => res.json())
}

export function fetcherPOST(url, data) {
  return fetcher(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}