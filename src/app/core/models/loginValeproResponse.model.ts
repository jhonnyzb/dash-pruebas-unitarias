
export class LoginValeproResponseModel {
  /**
 * Modelo de respuesta para el inicio de sesión en Valepro.
 *
 * @param {string} UserId - El ID del usuario.
 * @param {string} UserName - El nombre de usuario.
 * @param {string} AccessToken - El token de acceso.
 * @param {string} Name - El nombre del usuario.
 * @param {string} LastName - El apellido del usuario.
 * @param {string} FullName - El nombre completo del usuario.
 * @param {string} Email - El correo electrónico del usuario.
 * @param {string} Phone - El número de teléfono del usuario.
 * @param {string} HiddenEmail - El correo electrónico oculto del usuario.
 * @param {string} HiddenPhone - El número de teléfono oculto del usuario.
 * @param {number} PersonId - El ID de la persona.
 * @param {string} SessionId - El ID de la sesión.
 * @param {number} ProgramId - El ID del programa.
 * @param {number} AccountId - El ID de la cuenta.
 * @param {string} ProgramName - El nombre del programa.
 * @param {number} LanguageId - El ID del idioma.
 * @param {boolean} RequiredNewPassword - Indica si se requiere una nueva contraseña.
 * @param {RoleModel[]} Roles - Los roles del usuario.
 * @param {boolean} AcceptHabeasData - Indica si se acepta el aviso de privacidad.
 * @param {boolean} AcceptTermsAndConditions - Indica si se aceptan los términos y condiciones.
 */
  constructor(
    public UserId: string,
    public UserName: string,
    public AccessToken: string,
    public Name: string,
    public LastName: string,
    public FullName: string,
    public Email: string,
    public Phone: string,
    public HiddenEmail: string,
    public HiddenPhone: string,
    public PersonId: number,
    public SessionId: string,
    public ProgramId: number,
    public AccountId: number,
    public ProgramName: string,
    public LanguageId: number,
    public RequiredNewPassword: boolean,
    public Roles: RoleModel[],
    public AcceptHabeasData: boolean,
    public AcceptTermsAndConditions: boolean
  ) { }
}



export class RoleModel {
  /**
 * Clase que representa un modelo de rol.
 *
 * @param RoleId - El ID del rol.
 * @param RoleName - El nombre del rol.
 */
  constructor(
    public RoleId: number,
    public RoleName: string
  ) { }
}



