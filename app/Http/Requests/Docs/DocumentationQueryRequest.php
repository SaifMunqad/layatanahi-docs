<?php

namespace App\Http\Requests\Docs;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DocumentationQueryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'action' => ['required', Rule::in(['sections', 'pages', 'page'])],
            'section_id' => ['required_if:action,pages,page', 'integer', 'exists:doc_sections,id'],
            'page_id' => ['required_if:action,page', 'integer', 'exists:doc_pages,id'],
        ];
    }
}
