const postAPI = async (
  URL,
  body,
  method = "POST",
  headers = { "Content-Type": "application/json" }
) => {
  try {
    if (!URL) {
      throw new Error("URL bulunamadı!");
    }

    // Base URL'i environment variable'dan al
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "";
    const fullURL = URL.startsWith("http") ? URL : `${baseURL}${URL}`;

    const data = await fetch(fullURL, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
      cache: "no-store",
      // cache önemli! her çalıştığında cache'deki veri yerine -> güncel veriyi almasını sağlar.
      // bu olmaz ise üncel veriyi almayabiliyor dikkat et.
      // Dinamik sayfalarda burası kullanılıyorsa o sayfalara -> export const dynamic = 'force-dynamic' ekle!
    })
      .then((res) => {
        if (res.url.includes("/notification") && res.redirected) {
          return (window.location.href = res.url);
        } else {
          return res.json();
        }
      })
      .catch((err) => console.log(err));

    return data;
  } catch (err) {
    throw new Error(`API request failed: ${err}`);
  }
};

const getAPI = async (
  URL,
  headers = { "Content-Type": "application/json" }
) => {
  // Base URL'i environment variable'dan al
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "";
  const fullURL = URL.startsWith("http") ? URL : `${baseURL}${URL}`;

  const data = await fetch(fullURL, {
    method: "GET",
    headers: headers,
    cache: "no-store",
  })
    .then((res) => {
      if (res.redirected) {
        // bazı yerlerde window'u bulamıyor kontrol et
        //return window.location.href = res.url;
      } else {
        return res.json();
      }
    })
    .catch((err) => console.log(err));

  return data;
};

export { postAPI, getAPI };
