# FAQ

##### Do we need to pass country code in all user requests? or does Uplink determine region independently? Does Uplink register the user's country code to the session upon login?

> Uses source ip and does a look up, won't need the country code in most cases. Maybe in search you may need to pass a country code. Uses a lookup to determine a country and it generally persists for a question. Right before streaming, there is another lookup just to be safe.

##### How can we request configuration json for each region? (US, UK and Canada) `i.e. - https://d1d0j1u9ayd8uc.cloudfront.net/channels/A7TIV9SL/show.website.json`

> No, we don't have anything like that.

##### How can we request the homepage and sub-categories json for each region (US, UK and Canada)

> We'll have to collaborate on this. You can set country code at the top level of navigation. Lets you create a navigation set for each region. 'what I don't know if what the implications are if we add country information to sub categories.' There's an API that will return the correct list of categories based on IP. May be apple specific. They have in the past created separate JSON files for devices, would be similar. The drawback to switching to a full geo categorical scheme would be a length in export time.

##### How can we request a list of videos for specific category. How can we apply ordering and pagination to that request?

> Within the search API you can specify a category ID. You need the id of the category, not the name. I sent Shukrhat some docs on this. You can order by alpha and recently added date. There is pagination. You can request this data via static or dynamic API, but if you use static, you don't get ordering or pagination, the file just is what it is.

##### How can we request information about the film? Should we query this information from the static or dynamic API?

> Whichever. Static will have more information, search API will only return what has been indexed. You can do a sniff on what's happening in the client app and find this. video_id.json is the most complete source of information.

##### How can we request a list of related videos by country code? Apparently, we can’t use the static API.

> This one's tricky. We'll have to think this through a little more. There's a static JSON file for all bunches of related content related to a video. This can be handled via the client asynchronously. All info for that row is in one json file we would just verify each id's eligibility before rendering it.

##### How can we request the list of Shudder.TV content for specific countries?

> This may have to come in as a feature request via the search API, there currently isn't a way exposed.

##### How can we obtain a DRM certificate (license) from IV for each platform?

> When we transcode we register against the respective DRM platforms a unique asset id that represents that asset. depends on the DRM, generally the license URL is within the manifest, for DRM we take that out and you make a request for it.

##### How do we activate a device with a 5-digit code and current token instead of asking the user to enter login and password if they've already logged in. They should only need to enter their activation code.

> It is possible to remove this requirement, requires some trust. This would need to be added as a feature request.

##### Are we going to use the same Channel code for US, UK and Canada?

> YES. There is a precedent for having a different channel for each country, but it's a huge workload burden.

##### How can we request a list of activated devices per user? What are the current limitations and how can we change them?

> Might be able to add it to user admin screen, would need to come through as a feature request. This is a list of all devices ever associated with a particular user. There is no device limit and that is not supported.

##### When you sign up via ATV, we pass the current user email to IV but later when we request this data from IV it returns nil. Is this issue fixed? This user cannot be found in uplink. [URGENT]

> Just fixed that on Wednesday 8/3.

##### How can we customize the welcome email after a user signs up via ATV?

> Yeah, you should be able to do it through Sailthru.
