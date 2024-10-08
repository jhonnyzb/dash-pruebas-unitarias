import * as CryptoJS from "crypto-js";

/**
 * Obtiene el valor almacenado en sessionStorage para la clave especificada.
 *
 * @template T - El tipo de dato esperado para el valor almacenado.
 * @param {string} key - La clave para buscar el valor en sessionStorage.
 * @param {string} [flag='admin'] - La bandera que indica si se utiliza la clave de encriptación para administrador o usuario.
 * @returns {T | null} - El valor almacenado en sessionStorage o null si no se encuentra.
 * @throws {Error} - Si ocurre un error al descifrar el valor almacenado en sessionStorage.
 */
export const getSession = <T>(key: string, flag: string = 'admin') => {
  let data = sessionStorage.getItem(key);
  let ENCRIPTKEY = "V4l3pr04dm1n"
  if (flag !== 'admin') ENCRIPTKEY = "V4l3pr0US3r"
  if (data) {
    const valueDescrypt = CryptoJS.AES.decrypt(data!, ENCRIPTKEY + key).toString(CryptoJS.enc.Utf8);
    if (!valueDescrypt) {
      throw new Error('Error al descifrar el valor almacenado en sessionStorage');
    }
    return JSON.parse(valueDescrypt) as T
  }
  return null;
}

/**
 * Obtiene la lista de menú almacenada en sessionStorage.
 *
 * @param key - La clave utilizada para almacenar la lista de menú.
 * @returns La lista de menú desencriptada o null si no se encuentra en sessionStorage.
 * @throws Error si ocurre un error al descifrar el valor almacenado en sessionStorage.
 */
export const getMenuList = <T>(key: string) => {
  let data = sessionStorage.getItem(key);
  let ENCRIPTKEY = "V4l3pr04dm1n"
  if (data) {
    const valueDescrypt = CryptoJS.AES.decrypt(data!, ENCRIPTKEY + key).toString(CryptoJS.enc.Utf8);
    if (!valueDescrypt) {
      throw new Error('Error al descifrar el valor almacenado en sessionStorage');
    }
    return JSON.parse(valueDescrypt) as T
  }
  return null;
}
