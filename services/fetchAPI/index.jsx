import { getBaseURL } from "@/config/env.config";

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
    const baseURL = getBaseURL();
    const fullURL = URL.startsWith("http") ? URL : `${baseURL}${URL}`;

    console.log(`API Call: ${method} ${fullURL}`); // Debug için

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
  try {
    // Base URL'i environment variable'dan al
    const baseURL = getBaseURL();
    const fullURL = URL.startsWith("http") ? URL : `${baseURL}${URL}`;

    console.log(`API Call: GET ${fullURL}`); // Debug için

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
  } catch (err) {
    console.error(`GET API request failed for ${URL}:`, err);
    throw err;
  }
};

export { postAPI, getAPI };
