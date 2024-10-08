
export class Functionality {
  /**
 * Clase que representa una funcionalidad.
 *
 * @param id - El identificador de la funcionalidad.
 * @param name - El nombre de la funcionalidad.
 * @param path - La ruta de la funcionalidad.
 * @param pages - Las páginas asociadas a la funcionalidad.
 */
  constructor(
    public id: number,
    public name: string,
    public path: string,
    public pages: Page[]
  ) { }
}


export class Page {
  /**
 * Clase que representa una página en la aplicación.
 *
 * @param pageId - El ID de la página.
 * @param pageName - El nombre de la página.
 * @param path - La ruta de la página.
 * @param permissions - Los permisos requeridos para acceder a la página.
 * @param orden - El orden de la página.
 * @param active - (Opcional) Indica si la página está activa.
 */
  constructor(
    public pageId: number,
    public pageName: string,
    public path: string,
    public permissions: string[],
    public orden: number,
    public active?: boolean
  ) { }
}


export class LoginResponseModel {
  /**
   * Modelo de respuesta para el inicio de sesión.
   *
   * @param userId - El ID del usuario.
   * @param userName - El nombre de usuario.
   * @param accessToken - El token de acceso.
   * @param email - El correo electrónico del usuario.
   * @param personId - El ID de la persona.
   * @param sessionId - El ID de la sesión.
   * @param roles - Los roles del usuario.
   * @param programId - El ID del programa.
   * @param programName - El nombre del programa.
   * @param languageId - El ID del idioma.
   * @param requiredNewPassword - Indica si se requiere una nueva contraseña.
   * @param phone - El número de teléfono del usuario.
   * @param hiddenPhone - El número de teléfono oculto.
   * @param hiddenEmail - El correo electrónico oculto.
   */
  constructor(
    public userId: string,
    public userName: string,
    public accessToken: string,
    public email: string,
    public personId: number,
    public sessionId: number,
    public roles: {},
    public programId: number,
    public programName: string,
    public languageId: number,
    public requiredNewPassword: boolean,
    public phone: number,
    public hiddenPhone: string,
    public hiddenEmail: string
  ) {
  }
}
