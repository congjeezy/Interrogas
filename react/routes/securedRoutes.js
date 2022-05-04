import { lazy } from 'react';
import PollsterForm from '../components/pollsters/PollsterForm';
import PollsterUpdate from '../components/pollsters/PollsterUpdate';
const Pollsters = lazy(() => import('../components/pollsters/Pollsters'));
const PollstersExportToCSV = lazy(() => import('../components/pollsters/PollstersExportToCSV'));
const AnalyticsDashboards = lazy(() => import('../pages/dashboard/analytics/index.js'));
const CampaignDashboard = lazy(() => import('../pages/dashboard/campaign/CampaignDashboard'));
const PageNotFound = lazy(() => import('../pages/error/PageNotFound'));
const References = lazy(() => import('../components/references/References'));
const BaseTemplate = lazy(() => import('../components/newslettertemplate/form/BaseTemplate'))
const EditUserProfile = lazy(() => import('../components/account/EditUserProfile'));
const SurveyForm = lazy(() => import('../pages/survey/forms/SurveyForm'));
const SurveyBuilder = lazy(() => import('../pages/survey/components/SurveyBuilder'));
const addSurveyQuestionForm = lazy(() => import('../pages/survey/forms/AddSurveyQuestion'));
const Candidates = lazy(() => import('../pages/candidates/Candidates.jsx'));
const NewCandidate = lazy(() => import('../pages/candidates/NewCandidate'));
const NewsletterSubscription = lazy(() => import('../components/newslettersubscription/NewsletterSubscription'));
const WebScraper = lazy(() => import('../pages/webscraper/components/WebScraper.jsx'));
const WebData = lazy(() => import('../pages/webscraper/components/WebData.jsx'));
const BlogsForm = lazy(() => import('../components/blogs/BlogsForm'));
const AnswerPreview = lazy(() => import('../pages/survey/forms/AnswerPreview'));
const FileManager = lazy(() => import('../pages/filemanager/FileManager'));
const Polls = lazy(() => import('../components/polls/PollsPage'));
const Unsubscribe = lazy(() => import('../components/newsletters/unsubscribe/Unsubscribe'));
const Newsletter = lazy(() => import('../components/newsletters/Newsletter'));
const Election = lazy(() => import('../components/elections/Election'));
const ElectionForm = lazy(() => import('../components/elections/ElectionForm'));
const SurveyInstances = lazy(() => import('../pages/survey/components/surveysinstances/SurveyInstance'));
const SelectedSurvey = lazy(() => import('../pages/survey/components/surveysinstances/SelectedSurvey'));
const SurveyChart = lazy(() => import('../pages/survey/components/surveysinstances/SurveyChart'));
const Locations = lazy(() => import('../pages/dashboard/locations/Locations'));
const Checkout = lazy(() => import('../components/checkout/Checkout'));
const AddSQAO = lazy(() => import('../pages/survey/forms/AddSQAO'));

const dashboardRoutes = [
    {
        path: '/dashboard/analytics',
        name: 'Analytics',
        element: AnalyticsDashboards,
        roles: ['Admin'],
        exact: true,
        isAnonymous: false,
    },

    {
        path: '/dashboard/campaign',
        name: 'Campaign',
        element: CampaignDashboard,
        exact: true,
        roles: ['Admin'],
        isAnonymous: false,
    },
    {
        path: '/dashboard',
        name: 'Dashboards',
        icon: 'uil-home-alt',
        header: 'Navigation',
        children: [
            {
                path: '/dashboard/analytics',
                name: 'Analytics',
                element: AnalyticsDashboards,
                roles: ['Admin'],
                exact: true,
                isAnonymous: false,
            },
        ],
    },
    {
        path: '/dashboard',
        name: 'Dashboards',
        icon: 'uil-home-alt',
        header: 'Navigation',
        children: [
            {
                path: '/dashboard/campaign',
                name: 'CampaignDashboard',
                element: CampaignDashboard,
                roles: ['Admin'],
                exact: true,
                isAnonymous: false,
            },
        ],
    },
];

const candidates = [
    {
        path: '/candidates',
        name: 'Candidates',
        exact: true,
        element: Candidates,
        roles: ['Admin'],
        isAnonymous: false,
    },
    {
        path: '/candidates/new',
        name: 'NewCan',
        exact: true,
        element: NewCandidate,
        roles: ['Admin'],
        isAnonymous: false,
    },
    {
        path: '/candidates/update',
        name: 'NewCan',
        exact: true,
        element: NewCandidate,
        roles: ['Admin'],
        isAnonymous: false,
    },
];
const fileManager = [
    {
        path: '/filemanager',
        name: 'FileManager',
        exact: true,
        element: FileManager,
        roles: ['Admin'],
        isAnonymous: false,
    },
];

const locations = [
    {
        path: '/locations',
        name: 'Locations',
        element: Locations,
        roles: [],
        exact: true,
        isAnonymous: false,
    },
];

const test = [
    {
        path: '/test',
        name: 'Test',
        exact: true,
        element: AnalyticsDashboards,
        roles: ['Fail'],
        isAnonymous: false,
    },
    {
        path: '/secured',
        name: 'A Secured Route',
        exact: true,
        element: AnalyticsDashboards,
        roles: ['Fail'],
        isAnonymous: false,
    },
    {
        path: '/secured2',
        name: 'A Secured Route',
        exact: true,
        element: AnalyticsDashboards,
        roles: ['Admin'],
        isAnonymous: false,
    },
];

const pollsters = [
    {
        path: '/pollsters',
        name: 'Pollsters',
        exact: true,
        element: Pollsters,
        roles: ['Admin', 'User'],
        isAnonymous: false,
    },
    {
        path: '/pollsters/new',
        name: 'PollsterForm',
        exact: true,
        element: PollsterForm,
        roles: ['Admin', 'User'],
        isAnonymous: false,
    },
    {
        path: '/pollsters/modify',
        name: 'PollsterUpdate',
        exact: true,
        element: PollsterUpdate,
        roles: ['Admin', 'User'],
        isAnonymous: false,
    },
    {
        path: '/components/pollsters/export',
        name: 'PollstersExportToCSV',
        exact: true,
        element: PollstersExportToCSV,
        roles: ['Admin', 'User'],
        isAnonymous: false,
    },
];

const surveys = [
    {
        path: '/surveys/new',
        name: 'Surveys',
        exact: true,
        element: SurveyForm,
        roles: ['Admin', 'User'],
        isAnonymous: false,
        children:[
            {
                path: '/surveys/:id',
                name: 'Surveys',
                exact: true,
                element: SurveyForm,
                roles: ['Admin', 'User'],
                isAnonymous: false,
            }
        ]
    },
    {
        path: '/surveys/design/:id',
        name: 'Surveys',
        exact: true,
        element: SurveyBuilder,
        roles: ['Admin', 'User'],
        isAnonymous: false,
        children: [
            {
                path: '/surveys/questions',
                name: 'SurveyQuestions',
                element: addSurveyQuestionForm,
                roles: ['Admin', 'User'],
                exact: true,
                isAnonymous: false,
                children: [
                    {
                        path: '/surveys/questions/answers/options',
                        name: 'SQAO',
                        exact: true,
                        element: AddSQAO,
                        roles: ['Admin', 'User'],
                        isAnonymous: false,
                    },
                ],
            },
            {
                path: '/surveys/answers',
                name: 'preview',
                exact: true,
                element: AnswerPreview,
                roles: ['Admin'],
                isAnonymous: false,
            },
        ],
    },
    {
        path: '/surveys/results',
        name: 'Surveys',
        exact: true,
        element: SurveyInstances,
        roles: ['Admin', 'User'],
        isAnonymous: false,
    },
    {
        path: '/surveys/selected',
        name: 'SelectedSurvey',
        exact: true,
        element: SelectedSurvey,
        roles: ['Admin', 'User'],
        isAnonymous: false,
    },
    {
        path: '/surveys/chart',
        name: 'SurveyChart',
        exact: true,
        element: SurveyChart,
        roles: ['Admin', 'User'],
        isAnonymous: false,
    },
];

const blogs = [
    {
        path: '/admin/blogs/new',
        name: 'Blogs',
        exact: true,
        element: BlogsForm,
        roles: ['Admin'],
        isAnonymous: false,
    },
    {
        path: '/admin/blogs/:id/edit',
        name: 'Blogs',
        exact: true,
        element: BlogsForm,
        roles: ['Admin'],
        isAnonymous: false,
    },
];

const election = [
    {
        path: '/elections',
        name: 'Election',
        exact: true,
        element: Election,
        roles: ['Admin'],
        isAnonymous: false,
    },
    {
        path: '/elections/new',
        name: 'ElectionForm',
        exact: true,
        element: ElectionForm,
        roles: ['Admin'],
        isAnonymous: false,
    },
];

const errorRoutes = [
    {
        path: '*',
        name: 'Error - 404',
        element: PageNotFound,
        roles: [],
        exact: true,
        isAnonymous: false,
    },
];

const newsletterTemplate = [
    {
        path: '/template',
        name: 'NewsletterTemplate',
        exact: true,
        element: BaseTemplate,
        roles: [],
        isAnonymous: false,
    },
];

const newsletter = [
    {
        path: '/newsletter',
        name: 'Newsletter',
        exact: true,
        element: Newsletter,
        roles: ['Admin'],
        isAnonymous: false,
    },
];


const userProfile = [
    {
        path: '/profile/edit',
        name: 'EditUserProfile',
        exact: true,
        element: EditUserProfile,
        roles: ['Admin', 'Campaign', 'Surveyor', 'User'],
    },
];

const newsletterSubscription = [
    {
        path: '/newsletters/subscriptions',
        name: 'Subscribe',
        element: NewsletterSubscription,
        roles: [],
        exact: true,
        isAnonymous: false,
    },
];

const webScraper = [
    {
        path: '/tools/webscraper',
        name: 'WebScraper',
        element: WebScraper,
        roles: ['Admin'],
        exact: true,
        isAnonymous: false,
    },
    {
        path: '/tools/webscraper/webdata',
        name: 'WebData',
        element: WebData,
        roles: ['Admin'],
        exact: true,
        isAnonymous: false,
    },
];

const unsubscribe = [
    {
        path: '/subs',
        name: 'Unsubscribe',
        exact: true,
        element: Unsubscribe,
        roles: ['User', 'Admin'],
        isAnonymous: false,
    },
];

const polls = [
    {
        path: '/polls',
        name: 'PollsPage',
        exact: true,
        element: Polls,
        roles: ['Admin'],
        isAnonymous: false,
    },
];

const references = [
    {
        path: '/references',
        name: 'References',
        exact: true,
        element: References,
        roles: [],
        isAnonymous: false,
    },
];

const checkout = [
    {
        path: '/checkout',
        name: 'Checkout',
        exact: true,
        element: Checkout,
        roles: [],
        isAnonymous: false,
    },
];

const allRoutes = [
    ...newsletterSubscription,
    ...dashboardRoutes,
    ...test,
    ...errorRoutes,
    ...surveys,
    ...candidates,
    ...polls,
    ...pollsters,
    ...userProfile,
    ...webScraper,
    ...blogs,
    ...newsletter,
    ...newsletterTemplate,
    ...fileManager,
    ...unsubscribe,
    ...references,
    ...locations,
    ...checkout,
    ...election,
];

export default allRoutes;
