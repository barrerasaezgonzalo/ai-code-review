import Image from "next/image";

export function Header() {
  return (
    <div className="flex items-center justify-between gap-3 mb-4">
      <div className="mb-6 flex items-center gap-3 ml-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-white">
            <Image
              src="/logo.png"
              alt="Logo"
              width={500}
              height={200}
              className="mb-4 mx-auto"
            />
          </h1>
          <p className="text-md text-gray-400 mt-4 text-left">
            Tu asistente de desarrollo: listo para resolver tus dudas técnicas y
            para humillar (con cariño) la calidad de tu código cuando los bugs
            empiezan a salir de fiesta.
          </p>
        </div>
      </div>
    </div>
  );
}
