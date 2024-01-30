import React, { FC } from "react";
import { Editor } from "@tinymce/tinymce-react";

type Props = {
    initialValue?: string;
    onChange: any;
};

const TextEditor: FC<Props> = ({ initialValue, onChange }) => {
    return (
        <Editor
            apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
            initialValue={initialValue}
            init={{
                height: 300,
                plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                    "undo redo | formatselect | bold italic backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={onChange}
        />
    );
};

export default TextEditor;
