
export class GTMSelectContent {
  /**
 * Modelo para representar el contenido seleccionado en GTM.
 *
 * @param event - El evento asociado al contenido seleccionado.
 * @param ParameterTarget - El objetivo del parámetro.
 * @param ParameterType - El tipo del parámetro.
 * @param ParameterLocation - La ubicación del parámetro.
 * @param ParameterCategory - La categoría del parámetro.
 * @param IDAccount - El ID de la cuenta asociada.
 * @param UserName - El nombre de usuario.
 * @param IDProgram - El ID del programa asociado.
 * @param IDPerson - El ID de la persona asociada.
 * @param ParameterText - El texto del parámetro.
 * @param ParameterItemID - El ID del elemento del parámetro.
 */
  constructor(
    public event: string,
    public ParameterTarget: string,
    public ParameterType: string,
    public ParameterLocation: string,
    public ParameterCategory: string,
    public IDAccount: number | string,
    public UserName: string,
    public IDProgram: number,
    public IDPerson: number,
    public ParameterText: string,
    public ParameterItemID: string
  ) { }
}
