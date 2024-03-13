// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'

export const Phone = S.string.pipe(
	S.trimmed(),
	S.nonEmpty(),
	S.pattern(
		/^(?:\+|00)(?:30|31|32|33|34|350|351|352|353|354|355|356|357|358|359|36|370|371|372|373|374|375|376|377|378|379|380|381|382|383|385|386|387|389|39|40|41|420|421|423|43|44|45|46|47|48|49|7|90|91|92|93|94|95|960|961|962|963|964|965|966|967|968|969|970|971|972|973|974|975|976|977|98|992|993|994|995|996|998)\d{7,14}$/,
		{
			message: () => 'Invalid phone number',
		},
	),
	S.title('Phone'),
	S.description('Phone number'),
	S.examples(['+4907121172923']),
)
