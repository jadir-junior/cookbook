import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const CookbookPreset = definePreset(Aura, {
  components: {
    chip: {
      root: {
        paddingY: '0.25rem',
        paddingX: '0.75rem',
        borderRadius: '8px',
      },
    },
  },
});
