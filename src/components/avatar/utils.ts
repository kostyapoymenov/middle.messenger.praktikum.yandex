import { updateAvatar } from '../../services/user';

const avatarChangeHandlers = new WeakMap<
  HTMLInputElement,
  (event: Event) => void
>();

export const handleAvatarClick = (event: Event): void => {
  const avatar = event.currentTarget as HTMLElement;
  const uploader = avatar.querySelector('input');
  if (!uploader) {
    return;
  }

  uploader.click();

  const existingHandler = avatarChangeHandlers.get(uploader);
  if (existingHandler) {
    uploader.removeEventListener('change', existingHandler);
  }

  const callback = (changeEvent: Event) => {
    const file = (changeEvent.target as HTMLInputElement)?.files?.[0];
    if (!file) {
      return;
    }
    updateAvatar(file);

    const reader = new FileReader();
    reader.onload = ({ target }): void => {
      if (target?.result) {
        const img = avatar.querySelector('img');
        if (img) {
          img.src = target.result as string;
          img.style.display = 'block';
        }
      }
    };
    reader.readAsDataURL(file);
  };

  uploader.addEventListener('change', callback);
  avatarChangeHandlers.set(uploader, callback);
};
