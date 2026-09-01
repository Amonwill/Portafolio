// Pequeña utilidad de debounce compartida.
// Se usa en los listeners de "resize" (canvas de fondo, grid de proyectos,
// grid de certificaciones) para no recalcular todo el layout en cada uno
// de los decenas de eventos que dispara el navegador mientras el usuario
// arrastra el borde de la ventana.
export function debounce<T extends (...args: any[]) => void>(fn: T, wait = 150) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), wait);
  };
}
