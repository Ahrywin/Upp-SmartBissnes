using System.Web.Http;
using System.Web.Http.Cors;

namespace BancaNet.Backend.WebApi
{
	public static class WebApiConfig
	{
		public static void Register(HttpConfiguration config)
		{
			// Web API configuration and services
#if DEBUG
			config.EnableCors(new EnableCorsAttribute("*", "*", "*"));
#endif

			// Web API routes
			config.MapHttpAttributeRoutes();

			config.Routes.MapHttpRoute(
				name: "DefaultApi",
				routeTemplate: "{controller}/{action}/{id}",
				defaults: new { id = RouteParameter.Optional }
			);
		}
	}
}
