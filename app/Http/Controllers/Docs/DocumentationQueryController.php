<?php

namespace App\Http\Controllers\Docs;

use App\Http\Controllers\Controller;
use App\Http\Requests\Docs\DocumentationQueryRequest;
use App\Models\DocPage;
use App\Models\DocSection;
use Illuminate\Http\JsonResponse;

class DocumentationQueryController extends Controller
{
    public function __invoke(DocumentationQueryRequest $request): JsonResponse
    {
        return match ($request->validated('action')) {
            'sections' => response()->json(['data' => DocSection::query()
                ->where('published', true)
                ->orderBy('sort_order')->get(['id', 'title', 'slug'])]),
            'pages' => response()->json(['data' => DocPage::query()
                ->where('section_id', $request->integer('section_id'))
                ->where('published', true)
                ->orderBy('sort_order')->get(['id', 'section_id', 'title', 'slug'])]),
            'page' => $this->page($request),
        };
    }

    private function page(DocumentationQueryRequest $request): JsonResponse
    {
        $page = DocPage::query()
            ->whereKey($request->integer('page_id'))
            ->where('section_id', $request->integer('section_id'))
            ->where('published', true)
            ->with('section:id,title,slug')
            ->firstOrFail();

        return response()->json(['data' => [
            'id' => $page->id,
            'section' => $page->section->only(['id', 'title', 'slug']),
            'title' => $page->title,
            'slug' => $page->slug,
            'content' => $page->content,
            'updated_at' => $page->updated_at,
        ]]);
    }
}
