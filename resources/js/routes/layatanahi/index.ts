import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Docs\LayatanahiController::overview
* @see app/Http/Controllers/Docs/LayatanahiController.php:10
* @route '/layatanahi/overview'
*/
export const overview = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: overview.url(options),
    method: 'get',
})

overview.definition = {
    methods: ["get","head"],
    url: '/layatanahi/overview',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::overview
* @see app/Http/Controllers/Docs/LayatanahiController.php:10
* @route '/layatanahi/overview'
*/
overview.url = (options?: RouteQueryOptions) => {
    return overview.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::overview
* @see app/Http/Controllers/Docs/LayatanahiController.php:10
* @route '/layatanahi/overview'
*/
overview.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: overview.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::overview
* @see app/Http/Controllers/Docs/LayatanahiController.php:10
* @route '/layatanahi/overview'
*/
overview.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: overview.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::overview
* @see app/Http/Controllers/Docs/LayatanahiController.php:10
* @route '/layatanahi/overview'
*/
const overviewForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: overview.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::overview
* @see app/Http/Controllers/Docs/LayatanahiController.php:10
* @route '/layatanahi/overview'
*/
overviewForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: overview.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::overview
* @see app/Http/Controllers/Docs/LayatanahiController.php:10
* @route '/layatanahi/overview'
*/
overviewForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: overview.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

overview.form = overviewForm

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::credits
* @see app/Http/Controllers/Docs/LayatanahiController.php:18
* @route '/layatanahi/credits'
*/
export const credits = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: credits.url(options),
    method: 'get',
})

credits.definition = {
    methods: ["get","head"],
    url: '/layatanahi/credits',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::credits
* @see app/Http/Controllers/Docs/LayatanahiController.php:18
* @route '/layatanahi/credits'
*/
credits.url = (options?: RouteQueryOptions) => {
    return credits.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::credits
* @see app/Http/Controllers/Docs/LayatanahiController.php:18
* @route '/layatanahi/credits'
*/
credits.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: credits.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::credits
* @see app/Http/Controllers/Docs/LayatanahiController.php:18
* @route '/layatanahi/credits'
*/
credits.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: credits.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::credits
* @see app/Http/Controllers/Docs/LayatanahiController.php:18
* @route '/layatanahi/credits'
*/
const creditsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: credits.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::credits
* @see app/Http/Controllers/Docs/LayatanahiController.php:18
* @route '/layatanahi/credits'
*/
creditsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: credits.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::credits
* @see app/Http/Controllers/Docs/LayatanahiController.php:18
* @route '/layatanahi/credits'
*/
creditsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: credits.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

credits.form = creditsForm

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::team
* @see app/Http/Controllers/Docs/LayatanahiController.php:26
* @route '/layatanahi/team'
*/
export const team = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: team.url(options),
    method: 'get',
})

team.definition = {
    methods: ["get","head"],
    url: '/layatanahi/team',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::team
* @see app/Http/Controllers/Docs/LayatanahiController.php:26
* @route '/layatanahi/team'
*/
team.url = (options?: RouteQueryOptions) => {
    return team.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::team
* @see app/Http/Controllers/Docs/LayatanahiController.php:26
* @route '/layatanahi/team'
*/
team.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: team.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::team
* @see app/Http/Controllers/Docs/LayatanahiController.php:26
* @route '/layatanahi/team'
*/
team.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: team.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::team
* @see app/Http/Controllers/Docs/LayatanahiController.php:26
* @route '/layatanahi/team'
*/
const teamForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: team.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::team
* @see app/Http/Controllers/Docs/LayatanahiController.php:26
* @route '/layatanahi/team'
*/
teamForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: team.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::team
* @see app/Http/Controllers/Docs/LayatanahiController.php:26
* @route '/layatanahi/team'
*/
teamForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: team.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

team.form = teamForm

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::idea
* @see app/Http/Controllers/Docs/LayatanahiController.php:34
* @route '/layatanahi/idea'
*/
export const idea = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: idea.url(options),
    method: 'get',
})

idea.definition = {
    methods: ["get","head"],
    url: '/layatanahi/idea',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::idea
* @see app/Http/Controllers/Docs/LayatanahiController.php:34
* @route '/layatanahi/idea'
*/
idea.url = (options?: RouteQueryOptions) => {
    return idea.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::idea
* @see app/Http/Controllers/Docs/LayatanahiController.php:34
* @route '/layatanahi/idea'
*/
idea.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: idea.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::idea
* @see app/Http/Controllers/Docs/LayatanahiController.php:34
* @route '/layatanahi/idea'
*/
idea.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: idea.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::idea
* @see app/Http/Controllers/Docs/LayatanahiController.php:34
* @route '/layatanahi/idea'
*/
const ideaForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: idea.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::idea
* @see app/Http/Controllers/Docs/LayatanahiController.php:34
* @route '/layatanahi/idea'
*/
ideaForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: idea.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::idea
* @see app/Http/Controllers/Docs/LayatanahiController.php:34
* @route '/layatanahi/idea'
*/
ideaForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: idea.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

idea.form = ideaForm

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::features
* @see app/Http/Controllers/Docs/LayatanahiController.php:42
* @route '/layatanahi/features'
*/
export const features = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: features.url(options),
    method: 'get',
})

features.definition = {
    methods: ["get","head"],
    url: '/layatanahi/features',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::features
* @see app/Http/Controllers/Docs/LayatanahiController.php:42
* @route '/layatanahi/features'
*/
features.url = (options?: RouteQueryOptions) => {
    return features.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::features
* @see app/Http/Controllers/Docs/LayatanahiController.php:42
* @route '/layatanahi/features'
*/
features.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: features.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::features
* @see app/Http/Controllers/Docs/LayatanahiController.php:42
* @route '/layatanahi/features'
*/
features.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: features.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::features
* @see app/Http/Controllers/Docs/LayatanahiController.php:42
* @route '/layatanahi/features'
*/
const featuresForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: features.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::features
* @see app/Http/Controllers/Docs/LayatanahiController.php:42
* @route '/layatanahi/features'
*/
featuresForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: features.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Docs\LayatanahiController::features
* @see app/Http/Controllers/Docs/LayatanahiController.php:42
* @route '/layatanahi/features'
*/
featuresForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: features.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

features.form = featuresForm

const layatanahi = {
    overview: Object.assign(overview, overview),
    credits: Object.assign(credits, credits),
    team: Object.assign(team, team),
    idea: Object.assign(idea, idea),
    features: Object.assign(features, features),
}

export default layatanahi