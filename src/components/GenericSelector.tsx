// interface CampiSelectorProps<T> {
//     selectFor?: string;
//     items: Array<T>;
//     labelKey: string; // A chave para o valor a ser exibido na opção
//     valueKey: string; // A chave para o valor a ser passado para o select
//     onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
// }

// export default function GenericSelector<T>({
//     selectFor,
//     items,
//     labelKey,
//     valueKey,
//     onChange
// }: CampiSelectorProps<T>) {
//     return (
//         <>
//             <label>{selectFor ? `Selecione uma ${selectFor}` : 'Selecione'}</label>
//             <select
//                 onChange={onChange}
//                 className="border p-2 rounded w-full"
//             >
//                 {selectFor && <option value="">Selecione uma {selectFor}</option>}
//                 {items.map((item, index) => (
//                     <option key={index} value={item[valueKey]}>
//                         {item[labelKey]}
//                     </option>
//                 ))}
//             </select>
//         </>
//     );
// }
