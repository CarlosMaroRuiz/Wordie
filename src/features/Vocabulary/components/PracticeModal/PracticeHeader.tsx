import { DialogTitle } from '@headlessui/react';
import { Lightning, X } from '@phosphor-icons/react';
import { Button } from '@common/Button';
import type { PracticeHeaderProps } from './types';

export const PracticeHeader = ({ onClose }: PracticeHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border-subtle bg-surface">
      <DialogTitle className="text-lg font-bold text-text-main flex items-center gap-2">
        <Lightning weight="fill" className="text-primary" />
        Sesión de práctica
      </DialogTitle>
      <Button variant="icon" size="sm" aria-label="Cerrar" onClick={onClose}>
        <X size={20} weight="bold" />
      </Button>
    </div>
  );
};
