import type { MarkdownPreviewProps } from '@uiw/react-markdown-preview';
import '@uiw/react-markdown-preview/markdown.css';
import type { MDEditorProps } from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import dynamic from 'next/dynamic';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });
const MDViewer = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
});

export const MarkdownEditor = ({ ...rest }: MDEditorProps) => {
  return (
    <div className="rounded-md border border-gray-200">
      <MDEditor {...rest} />
    </div>
  );
};

export const MarkdownViewer = ({ ...rest }: MarkdownPreviewProps) => {
  return (
    <div className="">
      <MDViewer {...rest} />
    </div>
  );
};
