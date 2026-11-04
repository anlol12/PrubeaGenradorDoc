import TopHeader from '../components/TopHeader';
import PageFooter from '../components/PageFooter';
import DocumentItem from '../components/DocumentItem';

const documents = [
  { id: 1, status: 'Completado' },
  { id: 2, status: 'Completado' },
  { id: 3, status: 'Completado' },
  { id: 4, status: 'Completado' },
];

export default function MisDocumentos() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-bg-light">
      <TopHeader active="documentos" />

      <main className="flex-1 p-10">
        <h2 className="mb-[5px] text-[26px] font-bold">Mis documentos</h2>
        <p className="text-sm font-semibold text-primary">
          {documents.length} completados
        </p>

        <div className="mt-[30px] flex max-w-[600px] flex-col gap-[15px]">
          {documents.map((doc) => (
            <DocumentItem key={doc.id} status={doc.status} />
          ))}
        </div>
      </main>

      <PageFooter />
    </div>
  );
}