import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\Docs\LayatanahiController::overview
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

overview.url = (options?: RouteQueryOptions) => {
    return overview.definition.url + queryParams(options)
}

overview.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: overview.url(options),
    method: 'get',
})

overview.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: overview.url(options),
    method: 'head',
})

const overviewForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: overview.url(options),
    method: 'get',
})

overviewForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: overview.url(options),
    method: 'get',
})

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

credits.url = (options?: RouteQueryOptions) => {
    return credits.definition.url + queryParams(options)
}

credits.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: credits.url(options),
    method: 'get',
})

credits.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: credits.url(options),
    method: 'head',
})

const creditsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: credits.url(options),
    method: 'get',
})

creditsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: credits.url(options),
    method: 'get',
})

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

team.url = (options?: RouteQueryOptions) => {
    return team.definition.url + queryParams(options)
}

team.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: team.url(options),
    method: 'get',
})

team.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: team.url(options),
    method: 'head',
})

const teamForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: team.url(options),
    method: 'get',
})

teamForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: team.url(options),
    method: 'get',
})

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

idea.url = (options?: RouteQueryOptions) => {
    return idea.definition.url + queryParams(options)
}

idea.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: idea.url(options),
    method: 'get',
})

idea.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: idea.url(options),
    method: 'head',
})

const ideaForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: idea.url(options),
    method: 'get',
})

ideaForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: idea.url(options),
    method: 'get',
})

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

features.url = (options?: RouteQueryOptions) => {
    return features.definition.url + queryParams(options)
}

features.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: features.url(options),
    method: 'get',
})

features.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: features.url(options),
    method: 'head',
})

const featuresForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: features.url(options),
    method: 'get',
})

featuresForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: features.url(options),
    method: 'get',
})

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
