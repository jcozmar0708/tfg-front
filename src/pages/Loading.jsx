const Loading = () => {
  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center px-4 text-white">
      <div className="flex flex-col items-center gap-6 animate-pulse">
        <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />

        <h1 className="text-2xl sm:text-3xl font-bold text-violet-500 text-center">
          Cargando contenido...
        </h1>

        <p className="text-sm text-neutral-400 text-center max-w-xs">
          Por favor espera un momento mientras preparamos todo para ti.
        </p>
      </div>
    </div>
  );
};

export default Loading;
