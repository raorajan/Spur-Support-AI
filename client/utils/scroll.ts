export const scrollToBottom = (elementRef: React.RefObject<HTMLElement | null>) => {
  if (elementRef.current) {
    elementRef.current.scrollTop = elementRef.current.scrollHeight;
  }
};
