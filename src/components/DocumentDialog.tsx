import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'

export default function DocumentDialog({ open, onOpenChange, title, content }: {
  open: boolean
  onOpenChange: (v: boolean) => void
  title: string
  content: string
}): JSX.Element {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <div className="fixed inset-0 bg-black/40 z-50" />
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <Dialog.Content className="w-full max-w-2xl bg-slate-900 rounded-lg p-6 shadow-lg">
            <Dialog.Title className="text-lg font-semibold text-slate-100">{title}</Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-slate-300">{content}</Dialog.Description>
            <div className="mt-4 flex justify-end">
              <Dialog.Close asChild>
                <button className="px-4 py-2 rounded bg-legal-500 text-white">Close</button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
