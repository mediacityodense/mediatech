import { DaySchedule } from './types';

const speakerImageModules = import.meta.glob('./Images/*.{jpg,jpeg,png,webp,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const SPEAKER_IMAGE_ASSETS = Object.fromEntries(
  Object.entries(speakerImageModules).map(([filePath, assetUrl]) => [
    filePath.split('/').pop() ?? filePath,
    assetUrl,
  ])
);

// Fill this map manually with local files from ./Images, for example:
// 'Ryan McKenna': '7.jpg'
const SPEAKER_IMAGE_MAP: Record<string, string> = {
  'Marie Høst': '6.jpg',
  'Suzanne Lord': '17.jpg',
  'Benedict Evans': '16.jpg',
  'Lasse Funder': '36.jpg',
  'Albert Dieckmann': '38.jpg',
  'Ryan McKenna': '12.jpg',
  'Niels Borg': '7.jpg', 
  'Ben Sheppard' : 'ben.jpg',
  'Pål-Magnus Slåtto': '5.jpg',
  'Wafaa Albadry': '34.jpg',
  'Adde Granberg': '8.jpg',
  'Freja Sofia Kalderén': '28.jpg',
  'Aisling McCabe': '54.jpg',
  'Marc Lefebvre': '31.jpg',
  'Anja Dalgaard-Nielsen': '14.jpg',
  'Rob Gleasure': '13.jpg',
  'Simon Dixon': '26.jpg',
  'Aporva Baxi': '27.jpg',
  'Peter Hecht': '21.jpg',
  'Frederikke Saabye': '49.jpg',
  'Sahara Muhaisen': '33.jpg',
  'Ian Wagdin': '41.jpg',
  'Rowan de Pomerai': '23.jpg',
  'Stephen Willmott': '3.jpg',
  'Ingrid Tinmannsvik': '22.jpg',
  'Lucas Zwicker': '48.jpg',
  'Mads Nissen': '4.jpg',
  'Heidi Philipsen': '46.jpg',
  'Michael Harrit': '45.jpg',
  'Mascha Ott': '47.jpg',
  'Carsten Sparwath': '44.jpg',
  'Esben Seerup': '30.jpg',
  'Daniel Ahern': '29.jpg',
  'Nikita Roy': '1.jpg',
  'Anders Opdahl': '25.jpg',
  'Jakob Rosinski': '20.jpg',
  'Emil Hørning': '18.jpg',
  'Märta Rydbeck': '35.jpg',
  'Christian Birkeland': '43.jpg',
  'Pål Rune Hansen': '42.jpg',
  'Lorenzo Zanni': '11.jpg',
  'Maria Baagøe Bové': '39.jpg',
  'Magnus Juul': '40.jpg',
  'Michael Dyrby': '53.jpg',
  'Kristoffer Hecquet': '2.jpg',
  'Claudio Pica': '',
  'Dimitra Letsa': '60.jpg',
  'AWS Team': 'aws.png',
  'Michael Jensen': '55.jpg',
  'Tue Oxenvad': '51.jpg',
  'Chloe Tsang' : '52.jpg'
};

const normalizeSpeakerImageKey = (value: string) =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .toLowerCase();

const NORMALIZED_SPEAKER_IMAGE_MAP = Object.fromEntries(
  Object.entries(SPEAKER_IMAGE_MAP).map(([speakerName, fileName]) => [
    normalizeSpeakerImageKey(speakerName),
    fileName,
  ])
);

const getSpeakerImage = (speakerName: string) => {
  if (!speakerName) {
    return undefined;
  }

  const directFileName = speakerName.split(/[\\/]/).pop();
  if (directFileName && /\.(png|jpe?g|webp)$/i.test(directFileName)) {
    return SPEAKER_IMAGE_ASSETS[directFileName];
  }

  const mappedFileName =
    NORMALIZED_SPEAKER_IMAGE_MAP[normalizeSpeakerImageKey(speakerName)];

  return mappedFileName ? SPEAKER_IMAGE_ASSETS[mappedFileName] : undefined;
};

export const SCHEDULE_DATA: DaySchedule[] = [
  {
    date: '2026-03-24',
    dayLabel: 'Tuesday',
    shortLabel: 'Tue 24',
    sessions: [
      {
        id: 'tue-2',
        startTime: '11:00',
        endTime: '16:00',
        title: 'AWS Boot Camp - Leveraging Agentic AI for Media - From Vision to Reality',
        description: "Deep dive workshop into cloud technologies for media - By special invitation, and not included in your Mediatech Festival ticket.\n\nAgenda for the Day:\n\n• 11:00 - 11:10: Welcome and Introduction\n• 11:10 - 12:15: Lighting Talks and Q&A\n• 12:15 - 13:15: Lunch & Networking\n• 13:15 - 14:45: Art of the Possible - Demo Presentations\n• 14:45 - 15:00: Break\n• 15:00 - 15:45: Interactive Session: Build your no-code Media AI Agent\n• 15:45 - 16:00: Closing Discussion and Q&A",
        detailsUrl: 'https://aws-experience.com/emea/north/e/918a2/leveraging-agentic-ai-for-media-from-vision-to-reality',
        track: 'Workshop',
        location: 'G.A.S.A. Track 2 room',
        speakers: [{ name: 'AWS Team', company: 'Amazon Web Services', image: getSpeakerImage('AWS Team') }]
      },
      {
        id: 'tue-16',
        startTime: '18:00',
        endTime: '24:00',
        title: 'Pre Festival Networking @ Ryans Irish Pub - Mediatech Festival ticket holders only!',
        description: 'Free bar and light food sponsored by Fonn Group, Vizrt & Mediability. Please show your Mediatech Festival ticket for entry',
        track: 'Social',
        location: 'Ryans Irish Pub, Fisketorvet 12, 5000 Odense'
      }
    ]
  },
  {
    date: '2026-03-25',
    dayLabel: 'Wednesday',
    shortLabel: 'Wed 25',
    sessions: [
      {
        id: 'wed-1',
        startTime: '08:45',
        endTime: '09:15',
        title: 'Registration & Light Breakfast',
        track: 'General',
        isBreak: true
      },
      {
        id: 'wed-2',
        startTime: '09:15',
        endTime: '09:30',
        title: 'Welcome to Mediatech Festival 2026',
        track: 'Main Stage',
        speakers: [
          {
            name: 'Michael Jensen',
            company: 'Media City Odense',
            role: 'CEO',
            image: getSpeakerImage('Michael Jensen'),
            bio: 'Michael Jensen is an experienced leader in media production and technical management with a proven track record of implementing automated systems, cloud and AI production. A passion for innovation and a strong ability to lead teams. Known for achieving results in dynamic environments, with a large industry network in most of the world. Jensen has been CEO of Media City Odense for the past two years.'
          },
          {
            name: 'Marie Høst',
            role: 'Host at Mediatech Festival',
            image: getSpeakerImage('Marie Høst'),
            bio: 'Marie Høst is a former host of the TV program So ein ding and now works as a moderator/host, tech journalist, podcast producer and lecturer. She has worked with digital culture and the impact of technology on our lives for the past 12 years.'
          }
        ]
      },
      {
        id: 'wed-3',
        startTime: '09:30',
        endTime: '10:00',
        title: 'Culture: The Invisible Engine of Digital Transformation',
        description: "You can redesign structures and introduce new systems, but without the right culture, progress stalls. When people feel respected, trusted and empowered, transformation moves from being a project to becoming a shared mission. Culture is what turns strategy into action, and action into lasting impact.",
        track: 'Main Stage',
        speakers: [{ 
            name: 'Suzanne Lord', 
            role: 'Head of Media Operations',
            company: 'BBC',
            image: getSpeakerImage('Suzanne Lord'),
            bio: "Suzanne Lord is Head of Media Operations at the BBC, leading teams that deliver world-class content and innovation from Salford. With more than 20 years experience in the media industry, she has worked across editorial, transformation and operations. Suzanne began her career as a journalist covering major national and international stories before moving into leadership roles driving strategic change. She has led landmark projects including decentralising production and decision-making across the UK,  and delivering the BBC World Services largest digital transformation to date. Suzanne is committed to collaboration, creativity and shaping the future of broadcasting through technology and talent development."
        }]
      },
      {
        id: 'wed-86',
        startTime: '10:00',
        endTime: '10:45',
        title: 'Hybrid threats and technologically charged irrationality',
        track: 'Main Stage',
        description: "Liberal, democratic information spaces are under increased pressure. External powers are seeking to create and exploit grievances and cleavages in our societies to stoke fear, uncertainty, and mistrust. Traditional media are striving to keep up with technologically charged mis- and disinformers. This keynote takes you on a tour of the changing geopolitical landscape and the drivers and actors that pose challenges to Western liberal democracy and to the integrity of our information space. It then zooms in on how and why traditional “factchecking” is insufficient in this changing environment, arguing i.a. that it rests excessively on a belief in rationality, while misinformers thrive on emotions like fear and anger. It explores how we might look for solutions in the cross section between technology and human cognition.",
        speakers: [
          { name: 'Anja Dalgaard-Nielsen', company: 'CBS', role: 'Professor', image: getSpeakerImage('Anja Dalgaard Nielsen'), bio:'Professor and Vicedean, Geopolitics and Business Security, Copenhagen Business School. Previously: Director of Intelligence, Danish Defence Intelligence Service; Director of Preventive Security, Danish Security and Intelligence Service; Professor (part time), University of Stavanger; Director, Institute for Strategy, Royal Danish Defence College; guest scholar, Stanford University; head of research unit, Danish institute for International Studies. Ph.d. with distinction from Johns Hopkins University School of Advanced International Studies.' },
          { name: 'Rob Gleasure', company: 'CBS', role: 'Professor', image: getSpeakerImage('Rob Gleasure'), bio:'I am Professor of Collective Intelligence and Online Emotion and Vice Head of Department at the Department of Digitalization at Copenhagen Business School. My research focuses on how individuals come together to share information and coordinate behaviors online, with particular emphasis on the cognitive security and the threats of misinformation and polarization. I strive to produce high-quality, internationally visible impact. I was ranked 5th in the world for the number of articles published as lead author in the AIS Senior Scholars basket of 8 premier Information Systems journals (also known as the straight count) during the 5-year period'  }
        ]
      },
      {
        id: 'wed-stage2-32',
        startTime: '10:15',
        endTime: '10:45',
        title: 'OpinionPoint: Rethinking Social Platforms',
        track: 'Track 2',
        description: 'Tue Oxenvad explores why Europe must reclaim control of its digital public spaces and what it takes to build democratic, data-sovereign platforms at home.',
        speakers: [{
          name: 'Tue Oxenvad', company: 'OpinionPoint', role: 'Co-founder', image: getSpeakerImage('Tue Oxenvad'), bio:'I am the co-founder of OpinionPoint and CEO of JTOX, I hold a MSc in E-business from the IT University of Copenhagen.'
        }]
      },

      {
        id: 'wed-break-1',
        startTime: '10:45',
        endTime: '11:00',
        title: 'Networking & Coffee Break',
        track: 'Social',
        isBreak: true
      },
      {
        id: 'wed-91',
        startTime: '11:00',
        endTime: '11:30',
        title: 'Google News Partnerships and AI innovation in Google products',
        description: "Google has partnered with the news industry for more than 20 years, and continues to do so as we explore new shared opportunities for publishers and consumers. A snapshot of the latest developments of AI innovation in Google Products, the type of partnerships Google is engaging with the news ecosystem and the opportunities ahead. ",
        track: 'Main Stage',
        speakers: [{ 
            name: 'Dimitra Letsa', 
            company: 'Google', 
            role: 'Strategic Partnerships',
            image: getSpeakerImage('Dimitra Letsa'),
            bio: 'Dimitra Letsa has been responsible for Google strategic partnerships in Scandinavia since 2022. She has 25 years of solid media experience in journalism, product and business development. She has held senior positions for news agencies and big tech companies.'
        }]
      },
      {
        id: 'wed-31',
        startTime: '11:00',
        endTime: '11:30',
        title: 'OGraf: HTML Graphic Specifications',
        description: "The OGraf specification is set to redefine how broadcasters create, manage, and share on-air graphics, promising improved interoperability and flexibility. Join Ryan and Niels as they unveil the key features of OGraf.",
        track: 'Track 2',
        speakers: [
          { name: 'Ryan McKenna', company: 'BBC', role: 'Executive Product Manager', image: getSpeakerImage('Ryan McKenna'),bio:'I’m the Executive Product Manager for Graphics & Automation at the BBC Technology Group. I’m responsible for a portfolio of broadcast graphic production products. Products are used by internal staff at the BBC, or automated to use data that drives visuals on TV programmes and streams. Since starting this role in the summer of 2021, I’ve been developing a product strategy for interoperable graphics across the BBC, and a standard for web motion graphics in broadcasting. RowZed is our tool for driving HTML motion graphics, using end-to-end web technologies. Users across the UK add live graphics through the web app, mainly on BBC Sport TV and streams. The app was vital during covid lockdowns allowing producers to add match graphics remotely on coverage of the FA Cup. It has also been developed to render files for highlight edits as part of a “Sustainable Productions” IBC Accelerator project. Video file rendering is done through Chrome Puppeteer & FFMPEG.'  },
          { name: 'Ben Sheppard', company: 'BBC', role: 'Product Manager', image: getSpeakerImage('Ben Sheppard'), bio:'Ben Sheppard is a Product Manager within Graphics & Automation in the BBC looking after HTML workflow tools and templates. Ben has a background in Web Development with almost two decades of experience specifically within eCommerce and creative web experiences.' }
        ]
      },
      {
        id: 'wed-15',
        startTime: '11:30',
        endTime: '12:00',
        title: 'Sorting the Signal from the Noise: Three Years of Generative AI in the Newsroom',
        description: "Three years ago, generative AI entered almost every newsroom, promising transformation. Today, the transformation is real, but not in the ways the AI industry sold us. Now, many major newsrooms are making deals with big tech. It's time to sift through the noise and ask what generative AI actually offers journalism versus what it's already damaging. Some AI serves journalism. Some betray it. But which is which? And who decides? What are the consequences? On audiences. On us. On the infrastructure of journalism itself? Cyberpsychology tells us trust is a cognitive shortcut. Break it, and audiences don't just doubt. They disappear. What does that mean for an industry built on verified reality now racing to adopt tools designed to fabricate it? And what about us? Journalists are being asked to compete with machines trained on their own work, while being told that our jobs depend on this new technology. Are we making permanent decisions inside a bubble? Bubbles burst. This keynote asks what happens when this one does.",
        track: 'Main Stage',
        speakers: [{ 
            name: 'Wafaa Albadry',
            role: 'Journalist & Founder',
            company: 'Ai.Human.Story',
            image: getSpeakerImage('Wafaa Albadry'),
            bio: 'Wafaa Albadry is an award-winning journalist, editor, and media innovation leader with over 15 years of experience.'
        }]
      },
      {
        id: 'thu-8',
        startTime: '11:30',
        endTime: '12:00',
        title: 'Disruptive by Design: How TAMS Unlocks the Future of Production Workflows',
        description: "The Time Addressable Media Store (TAMS) solution, backed by the BBC, Sky, and several AWS partners, is a cloud-native, open, and interoperable platform designed for creating news and sports content with extremely fast turnaround times. Customers in the media industry face numerous challenges in those workflows, including vendor lock-in and inflexible, costly solutions. This presentation introduces an innovative approach to addressing these industry-wide issues through TAMS. By enabling seamless access to media assets through time-based addressing on any storage, TAMS fundamentally transforms how content is stored, accessed, and processed. Discover how AWS has partnered with leading technology providers to integrate TAMS into their solutions, enabling more agile and cost-effective content production workflows.",
        track: 'Track 2',
        speakers: [{ name: 'Jakob Rosinski', company: 'AWS', role: 'Solutions Architect', bio:'Jakob Rosinski is a Principal Solutions Architect at AWS with 18 years of experience in the Media & Entertainment industry. Jakob leverages his expertise to help European customers successfully migrate their media workloads to the cloud. He specializes in media supply chain and archival solutions and serves as the global technical lead for this solution area at AWS.', image: getSpeakerImage('Jakob Rosinski') }]
      },
      {
        id: 'wed-break-2',
        startTime: '12:00',
        endTime: '12:45',
        title: 'Networking & Lunch',
        track: 'Social',
        isBreak: true
      },
      {
        id: 'wed-8',
        startTime: '12:45',
        endTime: '13:15',
        title: 'From Broadcast quality to Viewers experience, tech or culture. The tech are there, are we? ',
        description: "Historically, the media industry focused on Broadcast Quality a high technical standard for video and audio transmission that required an army of engineers highly trained in the media technology culture of the previous century. This was a supply-led model where the industry set the rules and consumers accepted what was delivered. In summary, the transition is from a culture that values technical perfection (Broadcast Quality) to one that must value consumer convenience (Viewer Experience) to survive. While the tech is ready, many media companies are still struggling with this shift because their business models are based on old traditions. Acknowledging that the consumer sets the rules would require a complete reinvention of their organizational culture. Adde Granberg will take us on a presentation on why it is now more important than ever that the media moves and listens to their customers.",
        track: 'Main Stage',
        speakers: [{ 
            name: 'Adde Granberg', 
            company: 'SVT', 
            role: 'Innovation Lead',
            image: getSpeakerImage('Adde Granberg'),
            bio: 'Adde Granberg is a prominent technical leader in the media industry, best known for his role at SVT (Swedish Television), where he has held titles such as CTO (Chief Technology Officer) and now focuses on innovation as Innovation Strategist. He is known for his visionary approach to media production, technical transformation and digitalization, including work with 4K production, technical security, emergency preparedness and strengthening collaborations within engineering and distribution. Granberg has deep experience in technology, production and innovation, and is working to adapt SVT to the media landscape of the future.'
        }]
      },
      {
        id: 'wed-88',
        startTime: '12:45',
        endTime: '13:45',
        title: 'Break Out Session - From data protection to digital power',
        track: 'Track 2',
        description: "The geopolitical tensions have significantly altered the business landscape corporations are navigating in. Today, security, trade and commercial politics are merging. Access to verified and factual based information has never been more critical, and the new world order has also led to rising data privacy concerns. What was once seen as a purely technical issue has now become a strategic business risk: What happens if you lose access to your own data or are infiltrated? Forward-thinking organizations are already exploring cloud and AI solutions that guarantee European jurisdiction, operated by EU personnel, to secure their competitive edge and business continuity. But how should we understand digital sovereignty and what measurements should be done to safeguard your operations?",
        speakers: [
          { name: 'Peter Hecht', company: 'T-Systems', role: 'Marketing Director', image: getSpeakerImage('Peter Hecht'), bio:'Peter has been part of the international IT industry for more than a decade, where he has worked with business development, market strategy, marketing, management communication and PR. As Marketing & Sustainability Director for T-Systems in Northern Europe, Peter works with elucidating the benefits of digitalization and are deeply involved in market and customer dialogues around digital sovereignty. He is a member of the regional board of management and responsible for the regional sustainability practice with a focus on how digital solutions support ambitious sustainability goals. Peter’s experience also stems from American IT suppliers such as CSC and DXC Technology and has worked as an external lecturer at Copenhagen Business School, from which he also has two masters degrees.' },
          { name: 'Claudio Pica', company: 'SDU eScience', role: 'Center Director', bio:'At the SDU eScience Center, we are deeply engaged in both the national and European development of HPC, AI, and sovereign cloud infrastructures. Our open-source platform UCloud serves as a concrete example of such an approach: it is today the largest operational research cloud in Europe (now with ~19000 danish users), designed from the ground up to ensure data sovereignty, transparency, and compliance while remaining fully open and collaborative.',  image: getSpeakerImage('Claudio Pica') },
          { name: 'Frederikke Saabye', company: 'Dansk Erhverv', role: 'Acting Industry Director for Digitalization, Technology & Telecom', image: getSpeakerImage('Frederikke Saabye') }
        ]
      },
      {
        id: 'wed-9',
        startTime: '13:15',
        endTime: '13:45',
        title: 'Democratizing AI: From strategy to reality with a human-centered approach - Successful AI implementation is as much about people as it is about technology. It depends on culture, motivation, and trust.',
        track: 'Main Stage',
        description: "In many newsrooms, adoption isn't difficult because the tools are bad - it's difficult because the change competes with identity, editorial judgement, time pressure and deeply rooted routines. In this keynote, Freja Sofia Kalderén shares what it takes to move from pilots to everyday practice without losing what makes journalism work: autonomy, craft, quality, and trust. She explores how to design implementation that aligns with what teams care about, while still meeting organisational goals like efficiency, scalability and responsible use. Drawing on real newsroom implementation experience, the keynote combines change management with practical adoption design - showing how to align incentives, expectations, and guardrails so AI becomes a natural part of daily editorial work, not a top-down mandate that drains culture. ",
        speakers: [{ 
            name: 'Freja Sofia Kalderén', 
            company: 'Bonnier', 
            role: 'Development Editor',
            image: getSpeakerImage('Freja Sofia Kalderen'),
            bio: 'Freja Sofia Kalderén is a Development Editor specialising in editorial AI implementation and newsroom innovation at Bonnier Publications/Bonnier News. She has a background in journalism and cross-format production spanning audio, digital, documentary and live reporting, and has spent part of her career helping editorial teams adopt new workflows, tools and formats in practice across the Nordic media landscape. Freja is transforming complex technology into everyday editorial value, building adoption through training, change management and clear governance - and making innovation work while upholding culture, quality and trust.'
        }]
      },
      {
        id: 'wed-4',
        startTime: '13:45',
        endTime: '14:15',
        title: 'AI eats the world',
        description: "AI Eats the World: From Logic to Probability. Benedict Evans’ thesis builds on the old adage that 'software is eating the world.' Now, we see that AI is eating software.",
        track: 'Main Stage',
        speakers: [{ 
            name: 'Benedict Evans',
            role: 'Independent Media Analyst',
            image: getSpeakerImage('Benedict Evans'),
            bio: 'Benedict Evans is a leading independent analyst covering the tech industry, mobile, and media.'
        }]
      },
      {
        id: 'wed-92',
        startTime: '14:15',
        endTime: '14:45',
        title: 'Mapping Tomorrow’s Media: AI, Strategy, People & Futures Thinking in Action',
        description: "This talk explores how to approach strategy in an AI-mediated environment where technology and consumer behaviour are evolving at speed. It outlines a practical approach to navigating uncertainty: combining futures thinking, experimentation and clear principles to guide decision-making. It explores how to build shared understanding, align stakeholders, and create space for responsible innovation. How do we foster collaboration between editorial, product, technology and business? And how do we ensure AI strengthens rather than fragments our creative and public value missions? ",
        track: 'Main Stage',
        speakers: [{ 
            name: 'Aisling McCabe', 
            company: 'The Irish Times', 
            role: 'Group Strategy and Business Development Director',
            bio: 'Experienced business leader with a proven track record of success in the media/technology industry. I have 20+ years experience in senior leadership roles leading strategy, partnerships, business development and digital transformation. ',
            image: getSpeakerImage('Aisling McCabe')
        }]
      },
            {
        id: 'wed-899',
        startTime: '14:15',
        endTime: '14:45',
        title: 'Words are the new code',
        description:'After Andrej Karpathy used the word vibe coding in a tweet on X in February 2025, the term quickly spread to large parts of the world, including Norway. Sahara Muhaisen takes you through the first year of vibe coding in Norwegian newsrooms and shows examples of how Norwegian journalists have used language models to build things faster, test ideas without large teams, and extract insights from data.',
        track: 'Track 2',
        speakers: [
          { name: 'Sahara Muhaisen', company: 'NRK', role: 'Tech Journalist',bio:'Sahara Muhaisen is a technology journalist at NRK. She is educated as both a journalist and a technologist, with a background as a data and data journalist. The Norwegian public knows her best as the journalist who dated Otto, a ChatGPT boyfriend.', image: getSpeakerImage('Sahara Muhaisen') },
        ]
      },
      {
        id: 'wed-break-3',
        startTime: '14:45',
        endTime: '15:15',
        title: 'Networking & Coffee Break',
        track: 'Social',
        isBreak: true
      },
      {
        id: 'wed-30',
        startTime: '15:15',
        endTime: '15:45',
        title: 'Beyond the Efficiency Trap: How DR Used AI to Supercharge the Local Newsroom',
        description: "During the municipal elections, DR launched a completely new offer - dr.dk/mitvalg - where users could find KV-related stories from their municipality for the first time. Every day during the election campaign, 63 hours of P4 radio were processed in a long chain with several links. Most of them were based on AI, where artificial intelligence was used for transcribing, dividing, classifying & metadata, grouping and generating drafts for the final posts. The last - and crucial - link consisted of manual editorial control at the individual P4 editorial offices. The experiment showed great potential for AI-supported versioning and further use of existing content, and provided valuable experience with how AI can be included in the journalistic work process.",
        track: 'Main Stage',
        speakers: [
          { name: 'Lasse Funder', company: 'DR', role: 'Data Scientist', image: getSpeakerImage('Lasse Funder'), bio: 'Journalist, producer and Data Scientist. 20+ years of experience with journalism, tv production, newsroom management and the development of new formats from Denmarks leading media corporation. Master in Software Design from IT University of Copenhagen. Specialist in AI and Machine Learning. Very interested in the intersection of journalism and technology and the possibilities and challenges awaiting both industries' },
          { name: 'Albert Dieckmann', company: 'DR', role: 'Team lead', image: getSpeakerImage('Albert Dieckmann'), bio:'As a Scrum Master, my main goal is to facilitate and serve the agile team Im working with. With an eye for the core values of Scrum and with a constant focus on deliveries of high quality and on a continous basis I enable the team to perform at their best.'  }
        ]
      },
      {
        id: 'wed-890',
        startTime: '15:15',
        endTime: '15:45',
        title: 'Media Exchance Layer - Virtuel Cabling',
        description:'This session will look at the migration to software-based workflows and the importance of building open technology stacks. Using the EBU Dynamic Media Facility reference architecture, we will look at some of the considerations that both implementors and manufacturers need to consider. Ian will also explain the Media eXchange Layer (MXL) and why it is key to unlocking the workflows of the future.',
        track: 'Track 2',
        speakers: [
          { name: 'Ian Wagdin', company: 'Appear', role: 'VP-Technology and Innovation',bio:'Ian is VP Technology and Innovation at Appear where he works with industry to explore the latest in live production. He has worked in production for 30 years and has been at the forefront of many changes including the move from SD to HD and from tape based to file based workflows. He has extensive experience in technical operations having worked in News, Sport, Children’s TV Long form production. He previously worked with the BBC R&D team where he worked on IP production and the use of 5G in production for which he was nominated and won several innovation awards.', image: getSpeakerImage('Ian Wagdin') },
        ]
      },
      {
        id: 'wed-141',
        startTime: '15:45',
        endTime: '16:15',
        title: 'CBC/Radio-Canada: Transforming Storytelling and Production for a Modern Audience',
        description: "Like other public service media, CBC/Radio-Canada is in the midst of an ongoing digital transformation, one that aims to strengthen its local presence, enhance digital discoverability of its content, and foster understanding across differences in its storytelling. This shift has fundamentally changed the organization's approach to content production technology. The organization is simplifying the user experience and equipping storytellers with the tools needed for modern audiences by implementing browser-based user experiences and software-based tools for both live and on-demand content production. Furthermore, by adopting a product model, CBC/Radio-Canada is ensuring its production systems can remain adaptable as technology and audience habits evolve. ",
        track: 'Main Stage',
        speakers: [{ 
            name: 'Marc Lefebvre',
            company: 'CBC Canada',
            role: 'Senior Director, Operations',
            image: getSpeakerImage('Marc Lefebvre'),
            bio: 'As Senior Director of Operations for CBC News, Marc Lefebvre is responsible for overseeing media production, managing resources, implementing data-driven continuous improvement initiatives, and strategic project planning for the journalism division. Marc brings extensive experience in producing lifestyle and entertainment programs, and has held several operations leadership positions at both local and network levels within CBC. As a transformational leader, Marc has successfully guided his teams in reorganizing and redefining their approaches to align with CBCs audience strategy and achieve success on digital platforms. He is a strong advocate for enhancing the employee experience through empowering teams to optimize workflows, simplify tools, and cultivate a more collaborative, open, and inclusive culture.'
      }]
      },
      {
        id: 'wed-32',
        startTime: '15:45',
        endTime: '16:15',
        title: 'Control Without Compromise: Meeting Sovereignty Requirements While Driving Innovation',
        description: "Organizations face increasing complexity in a changing sovereignty landscape. A solid digital foundation helps simplify meeting current requirements and future-proof your business, without stifling innovation. In this session, learn how AWS' cloud solutions, from data location and encryption services to the announced AWS European Sovereign Cloud, offer greater control and choice to meet your unique needs.",
        track: 'Track 2',
        speakers: [
          { name: 'Pål-Magnus Slåtto', company: 'AWS', role: 'Senior Solutions Architect, Public Sector', image: getSpeakerImage('Pal Magnus Slatto'), bio: 'Pål-Magnus Slåtto is a Senior Solutions Architect at Amazon Web Services, AWS, known for his expertise in digital transformation, cybersecurity, software development and IT operations, helping organizations innovate securely. He holds a Bachelor of Science in Economics from BI Norwegian Business School and studied mobile ecosystems at Westerdals Oslo ACT. He is also known from the TV program Tenketoget, Science on tracks' },
        ]
      },
      {
        id: 'wed-898',
        startTime: '16:15',
        endTime: '16:45',
        title: 'A year of AI and Acquisitions',
        description: "The DPP is the pre-eminent network of senior media and technology leaders across Europe and North America. It has the privilege of working with almost 150 media companies and hundreds of their technology partners. So when it comes to trends, we spend a lot of time considering: whats essential, and whats just noise? In a year that's already set to be dominated by talk of mergers, acquisitions, and artificial intelligence, it's more important than ever to find clarity. So join Rowan for a light hearted look at some very serious topics, as he outlines the trends that really matter for media and technology.",
        track: 'Track 2',
        speakers: [
          { name: 'Rowan de Pomerai', company: 'DPP', role: 'CEO',bio:'Rowan has an MEng in Electronic Engineering with Media Technology from the University of York, and a strong background in media innovation, having started his career in BBC Research & Development. Since then he has delivered transformative change for some of the UK’s biggest broadcasters and producers, including architecting and deploying the BBC’s Automated QC solutions. He then joined ITV where he was Senior Technical Manager for ITV Studios, leading the Production Modernisation project to streamline the production process and ready the company for file-based delivery. Rowan de Pomerai is CEO at the DPP, the media industrys business network. The DPP is the place where customers and suppliers come together to solve problems and create opportunity; Rowan leads the DPPs technology strategy and delivery, driving a collaborative approach to solving real business problems across the media industry.', image: getSpeakerImage('Rowan de Pomerai') },
        ]
      },
      
      {
        id: 'wed-85',
        startTime: '16:45',
        endTime: '17:30',
        title: 'Designing for Billions: How Brands Stay Human at Scale',
        description: "Simon Dixon and Aporva Baxi founded DixonBaxi, a global brand agency that has redefined how billions experience the worlds most iconic brands. For more than two decades they have partnered with industry leaders including Formula One, Netflix, Apple, Roblox, Google, Samsung, Warner Bros. Discovery and Hulu, creating brand systems and experiences that reach audiences across the world. Their work operates at an extraordinary scale, shaping how people connect with brands that define culture, technology, business and entertainment. DixonBaxi is known for its creative culture and belief in people as the driving force of progress. Ideas begin with curiosity, collaboration, conviction, the foundation of a studio that continues to redefine how creativity transforms business and culture globally.",
        track: 'Main Stage',
        speakers: [
          { name: 'Simon Dixon', company: 'DixonBaxi', role: 'Co-Founder',bio:' The Co-Founder of DixonBaxi, a global brand agency. We create brand strategy, identities and design systems for some of the most iconic names in sport, entertainment, lifestyle, health, media and technology. Our work starts with people, with strategy and design working as one act of creativity to build brands people love and remember. We have worked with Delta Air Lines, AC Milan, Google, Headspace, Samsung, British Land, Roblox, Hulu, Netflix and Formula 1. Helping change how people feel about the brands in their lives. Three things guide everything we do. People. Creativity. Money. In that order.', image: getSpeakerImage('Simon Dixon') },
          { name: 'Aporva Baxi', company: 'DixonBaxi', role: 'Co-Founder',bio:'The Co-Founder and ECD of DixonBaxi with my long-time business and creative partner Simon Dixon. We work with companies in moments of change, creating intelligent systems that make them clearer, more distinctive, and built for scale.Our collaborations range across culture, sport, entertainment, and technology, including Roblox, Formula One, ESPN, G42, Tubi, AC Milan, ITV, Amazon, IMAX, Eurosport, Audible, Netflix, British Land, MTV, and Samsung. We design identities that adapt and perform globally without losing their point of view.Alongside our work, we share our practice openly through initiatives like The DixonBaxi Way, Journeys, and our 500-page book, REMIX, making creativity more accessible to anyone, at any stage of their path.I’m proud to serve on the board of The One Club for Creativity and the Art Directors Club in New York, have judged the D&amp;AD Branding Jury, and often speak at events such as D&amp;AD and OFFF.Transformation should honour what makes a brand matter while giving it the intelligence and clarity to lead its next chapter.', image: getSpeakerImage('Aporva Baxi') }
        ]
      },

      {
        id: 'web-closing-2',
        startTime: '17:30',
        endTime: '17:45',
        title: 'Round-up',
        track: 'Main Stage',
        isBreak: true
        },
      {
        id: 'wed-16',
        startTime: '18:00',
        endTime: '24:00',
        title: 'Networking @ Ryans Irish Pub',
        track: 'Social',
        description: 'Free bar and light food sponsored by TV 2 Denmark & JFM. Please show your Mediatech Festival ticket for entry',
        location: 'Ryans Irish Pub, Fisketorvet 12, 5000 Odense'
      }
    ]
  },
  {
    date: '2026-03-26',
    dayLabel: 'Thursday',
    shortLabel: 'Thu 26',
    sessions: [
      {
        id: 'thu-1',
        startTime: '08:30',
        endTime: '09:00',
        title: 'Registration & Light Breakfast',
        track: 'General',
        isBreak: true
      },
      {
        id: 'thu-12',
        startTime: '09:00',
        endTime: '09:30',
        title: 'Demo: The Journey of a New Media',
        track: 'Main Stage',
        speakers: [
          { 
            name: 'Ingrid Tinmannsvik', 
            company: 'DEMO', 
            role: 'Co-Founder',
            bio: 'Ingrid Tinmannsvik was the project manager for constructive journalism at the Norwegian Broadcasting Corporation (NRK). She has been a visual news journalist and video specialist at NRK for the past six years. Tinmannsvik is currently responsible for developing NRKs strategy for constructive journalism. As a journalist, her main focus has been reaching a younger audience with news across NRKs platforms. Now Ingrid is the Co-Founder of Demo, a Norweian version of the Danish Zetland. She graduated from Volda University College.',
            image: getSpeakerImage('Ingrid Tinmannsvik')
          }
        ]
      },
      {
        id: 'thu-2',
        startTime: '09:00',
        endTime: '09:30',
        title: 'More Flexibility Through Dynamic Production Environments',
        description: "How much flexibility do modern production environments really offer? In this session, Lucas explores this question by highlighting the fundamental principles of IP and software‑based processing solutions, as well as the concept of the DMF. He will also demonstrate how traditional workflows in TV and broadcasting can be reimagined using IP and cloud technologies and what it takes to successfully implement these approaches in practice.",
        track: 'Track 2',
        speakers: [
          { 
            name: 'Lucas Zwicker', 
            company: 'LAWO', 
            role: 'Senior Director, Workflow & Integration',
            bio: 'Lucas Zwicker has taken on the task of driving innovation by incubating new technologies, while exploring their applicability for current and future products. This especially involves harmonizing workflows and ensuring interoperability across the Lawo portfolio. Lucas Zwicker joined Lawo in 2014, having previously worked as a freelancer in the live sound and entertainment industry for several years. He holds a degree in event technology and a Bachelor of Engineering in electrical engineering and information technology from the University of Applied Sciences in Munich, Germany.',
            image: getSpeakerImage('Lucas Zwicker')
          }
        ]
      },

      {
        id: 'thu-3',
        startTime: '09:30',
        endTime: '10:00',
        title: 'Mads Nissen - Photography is all about empathy',
        track: 'Main Stage',
        speakers: [{ 
          name: 'Mads Nissen', 
          company: 'Politiken',
          role: 'Photographer',
          bio: 'For Mads Nissen (Denmark, 1979) photography is all about empathy - creating understanding and intimacy while confronting contemporary social issues such as inequality, human rights violations, and our destructive relationship with nature. He is a three-time recipient of the main prize at World Press Photo. Winner of the 2022 Visa dOr and announced as the 2023 International Photographer of the Year at POY. He has published three books, and in the fall of 2025, he will release his fourth, Sangre Blanca, a work about the global cocaine trade.',
          image: getSpeakerImage('Mads Nissen')
        }]
      },
      {
        id: 'thu-4',
        startTime: '09:30',
        endTime: '10:30',
        title: 'Can Media Be Truly Sustainable? A Conversation on Production and Storytelling',
        track: 'Track 2',
        speakers: [
          { name: 'Heidi Philipsen', role: 'Associate Professor', company: 'SDU', bio: 'Associate Professor in Media Studies and screen play development, critically discusses how the stories themselves can be sustainable both in their themes and in how they influence audiences. And does this limit creators creativity?', image: getSpeakerImage('Heidi Philipsen') },
          { name: 'Michael Harrit', role: 'Lead Architect', company: 'BBC', description:'As a responsible business, the BBC takes its duty to the environment and respect for the planet seriously. This is why we are committed to becoming Net Zero and Nature Positive. Our Value Chain is our largest source of carbon emissions, so collaboration with our suppliers will be key to success in reaching our sustainability goals In Technology we aim to capture and present data on our energy consumption for producing, implementing, operating and decommissioning technology to report actual energy data, deliver insights and save energy. This will enable the move away from spend-based approximations to actual emissions and support the technology, engineering and developer communities to design, deliver and operate sustainable products, solutions and services and further drives a continuous optimisation of our technology and operations to lower the environmental impact of the use of technology.', bio:'Michael Harrit is Lead Architect Sustainability at the BBC focused on scope 3 throughout the media supply chain and with engaging suppliers to minimise the environmental impact of the media indusry. He is driven by transforming the media business, its processes and technologies to become more sustainable and holds a masters degree in science in electronic engineering and an MBA in strategy and innovation. Before joining the BBC, Michael was the Marketing Director for Sonys professional media business across Europe, Multimedia Director at NTV in Moscow and Chief Architect at the Danish Broadcasting Corporation (DR).', image: getSpeakerImage('Michael Harrit') },
          { name: 'Mascha Ott', role: 'Sustainability Manager', company: 'Nordisk Film Production', bio: 'Mascha Ott is Sustainability Manager at Nordisk Film Production, where she works with sustainability both strategically and hands-on across film and series productions in Denmark, Sweden, and Norway. With eight years of experience in the film and TV industry from the production department, and a Nordic education in sustainable filmmaking she brings a strong, practical production perspective to the green transition. Her work focuses on meeting the growing demand for climate-friendly solutions, CO₂ measurement, and the implementation of the newly launched Nordic Standard for sustainable film production, while exploring how creativity and sustainability can go hand in hand and how the media industry can transition towards more climate-conscious and responsible production practices', image: getSpeakerImage('Mascha Ott') },
          { name: 'Carsten Sparwath', role: 'Head of Production', company: 'TV 2 Danmark', bio: 'Carsten Sparwath works as Head of Production at TV 2 Fiction, where he is responsible for the department’s financial and sustainability matters. He has over 30 years of production experience in the Danish film and television industry. Carsten is a certified sustainability specialist and co‑creator of the Green Manager course at the National Film School of Denmarks Continuing Education programme.', image: getSpeakerImage('Carsten Sparwath') }
        ]
      },
      {
        id: 'thu-5',
        startTime: '10:00',
        endTime: '10:30',
        title: '“Your Vote. Our Denmark”: How almost 50 newsrooms formed the biggest media partnership so far, and saved the local democracy. ',
        description: "Constructive Institute initiated in 2025 “Your Vote. Our Denmark” A historic media collaboration and national partnership leading up to the municipal and regional elections in 2025. The result stunned all experts: The media coverage was bigger and better than all expectations. And the final voter turnout did not go down as predicted. It went up. From 67,4 in 2021 to 69,2 percent. The secret was a unique collaborative partnership with virtually all local and regional newsrooms in Denmark - newspapers, radio and tv. Constructive Institute facilitated eight workshops with 325 journalists and editors, five rallies for 1000 political candidates, two bootcamps for 350 journalism students and 10 election festivals for 8000 voters up to the election day. Plus: Two innovation projects, 102 different opinion polls and a new, gamificated “Facttest” for each municipality. Esben Seerup is chief innovation officer at Constructive Institute. He was the project leader of “Your vote. Our Denmark” and will share how media collaborated in new ways instead of repeating old wars. ",
        track: 'Main Stage',
        speakers: [{        
          name: 'Esben Seerup', 
          company: 'Constructive Institute',
          role: 'Chief Innovation Officer',
          bio: 'Esben Seerup is a seasoned leader in local and regional news, with over 30 years of experience across various media platforms, including regional radio (DR Fyn), newspapers (Fyens Stiftstidende), and television (TV 2 Fyn). His career spans more than 25 years as editor, manager and CEO. From these positions he has consistently championed quality journalism, critical and constructive hand-in-hand, as a vital component of democracy. At TV 2 Fyn, Esben led a significant transformation, crafting a strategy that positioned the media house as Denmarks most constructive over a three-year change process. This effort involved the entire newsroom and resulted in TV 2 Fyn becoming the most trusted, most influential, and the dominant news source for the 500.000 people in the Funen region by 2024, boasting record-high viewers and digital user engagement. ',
          image: getSpeakerImage('Esben Seerup')
        }]
      },
      {
        id: 'thu-break-1',
        startTime: '10:30',
        endTime: '11:00',
        title: 'Networking & Coffee Break',
        track: 'Social',
        isBreak: true
      },
      {
        id: 'thu-6',
        startTime: '11:00',
        endTime: '11:30',
        title: 'Solving the Youth Audience Problem',
        description: "Reaching and retaining young audiences is one of the most urgent challenges facing media organisations globally. The Australian Broadcasting Corporation has spent the past four years building a creator-driven model that is beginning to show what works. In this session, Daniel Ahern will share the strategy behind the ABC Creator Program, one of the first broadcaster-led creator initiatives in the world. The program reached more than 140 million young viewers in 2024/25 and helped emerging digital creators move into television, audio and long-form storytelling. In his talk, Daniel will offer practical insights into how public broadcasters and traditional media can integrate creators into editorial teams, build sustainable digital-first workflows and produce authentic content that resonates with younger audiences at scale.",
        track: 'Main Stage',
        speakers: [{ name: 'Daniel Ahern', company: 'ABC Australia', role: 'Head of Creator Strategy', bio:'Daniel leads the ABC’s creator strategy and oversees its flagship TikTok, Instagram and YouTube “ABC Australia” accounts. He manages a multidisciplinary team of creators, producers and project managers, and as a commissioning editor he has developed original creator-led series across history, science and technology, Australian politics and the arts. His collaborations include educator Aslan Pahari, whose ABC YouTube and TikTok series inspired the hit podcast ASSASSINS, and art historian Mary McGillivray, whose short-form videos on Australian art evolved into a weekly ABC TV segment. Daniel has also led the ABC’s Futurecast media and technology conferences in 2023 and 2024, taught media innovation at the University of Technology Sydney, and previously grew youth station FBi Radio to record high listener numbers while managing a large team as Program Director. He holds Arts and Law degrees from UNSW.', image: getSpeakerImage('Daniel Ahern') }]
      },
      {
        id: 'thu-71',
        startTime: '11:00',
        endTime: '11:30',
        title: 'From Print to IP: VGTVs High Velocity Journey Into the Future of Broadcast',
        description: "VG, Norways largest news media house with 1.9 million daily users, has spent three decades in constant transformation from its early leap from print to online in 1995 to experimenting with streaming video as early as 1999. That momentum led to the creation of VGTV and now in 2026 the TV-Operations part of Schibsted has become a joint Scandinavian operation. This rapid growth has demanded not just new storytelling formats, but a complete rethink of production technology and workflows. At the center of this shift is VGTVs adoption of a modern IP based broadcast infrastructure, designed to deliver flexibility, scalability, and cross border collaboration. In this session, Pål Hansen, Head of Operations for TV in Norway and a key member of the Scandinavian TV Operations leadership group, shares insights from the journey the challenges, the breakthroughs, and how IP is enabling VGTV to build a future proof broadcast ecosystem ready for the next era of digital media.",
        track: 'Track 2',
        speakers: [{ 
            name: 'Pål Rune Hansen',
            role: 'Head of Operations',
            bio: 'Pål Rune have worked 24 years in the streaming media and tv-production industry. 34 years in the news media business in total.',
            company: 'VGTV',
            image: getSpeakerImage('Pål Rune Hansen')
        }]
      },
      {
        id: 'thu-7',
        startTime: '11:30',
        endTime: '12:00',
        title: 'Innovation from first principles',
        description: "One of the most compelling segments of the conversation centered on returning to first principles. Rather than simply bolting AI onto existing practices, Roy suggested the industry needs to reconsider journalism's fundamental purpose in an AI-powered information ecosystem. If we were inventing journalism today, what would we keep and what would we leave behind? This question echoes previous technological transitions in media history, from print to radio and beyond.",
        track: 'Main Stage',
        speakers: [{ 
            name: 'Nikita Roy',
            company: 'Newsroom Robots Lab',
            role: 'Founder',
            bio: 'Nikita Roy is a data scientist, journalist, and Harvard-recognized AI futurist. She is the founder of Newsroom Robots Lab, an AI training and advisory firm for media organizations, currently incubating at Harvard Innovation Labs. She also hosts Newsroom Robots, a globally charting podcast on AI and the future of journalism. As a Knight Fellow at the International Center for Journalists, she led global efforts to accelerate AI adoption in journalism, including launching the AI Journalism Lab at the City University of New York, supported by Microsoft. Nikita also serves on the national board of the Canadian Association of Journalists and is co-chair of its 2026 national conference in Ottawa. She was named one of twelve pioneers and power players shaping the future of news in the 2025 Future Today Strategy Group Tech Trends Report.',
            image: getSpeakerImage('Nikita Roy')
        }]
      },
      {
        id: 'thu-70',
        startTime: '12:00',
        endTime: '12:30',
        title: 'Stronger together: Nordic impact',
        description: "In a media market undergoing radical change, Amedia has taken the position as a leading Nordic player. With deep roots in Scandinavian newspaper tradition, we ensure journalism through closer cooperation across national borders. By sharing technology and increasing efficiency, we are setting ourselves up for tougher competition from artificial intelligence and social media.",
        track: 'Main Stage',
        speakers: [{ 
            name: 'Anders Opdahl',
            company: 'Amedia',
            role: 'CEO',
            bio:'Anders Opdahl started as CEO of Amedia in January 2017. He then came from the position of regional director at NRK. He has been editor-in-chief of Nordlys for five years and has also been a journalist and news editor in the newspaper. Anders also has a background as a reporter and chief of staff at Finnmark Dagblad and A-pressen’s Oslo editorial office and was a correspondent for Dagbladet in northern Norway.',
            image: getSpeakerImage('Anders Opdahl')
        }]
      },
      {
        id: 'thu-82',
        startTime: '12:00',
        endTime: '12:45',
        title: 'Live Hacking - How a modern bounty hunter hacks media websites',
        description: "Step into the toolbox of a modern bug bounty hunter hacker. Experience a live hack performed on stage - and gain insight into the techniques and tools that professional hackers use to find vulnerabilities in large companies. Get concrete advice on how to proactively identify and close security holes before they are exploited by malicious actors.",
        track: 'Track 2',
        speakers: [{ name: 'Emil Hørning', company: 'Defend Denmark', role: 'Head of hackers', image: getSpeakerImage('Emil Hørning') }]
      },
      {
        id: 'thu-69',
        startTime: '12:30',
        endTime: '12:45',
        title: 'RISE-To build a more balanced and innovative industry.',
        description: "Rise Women in Broadcast (often simply called Rise) is a prominent global advocacy organization dedicated to fostering gender diversity within the broadcast, media, and entertainment technology sectors. Founded in 2017 by Sadie Groom, it was created to address the significant under-representation of women in technical, engineering, and operational roles areas of the industry that have historically been male-dominated. Their flagship initiative, which pairs aspiring women with industry leaders for six months of career guidance. It operates across the UK, Europe, North America, APAC, India, ANZ, and the Middle East. Membership in Rise is free and open to anyone (including men and non-binary individuals) who supports their mission of gender equality in the industry.",
        track: 'Main Stage',
        speakers: [{ 
            name: 'Märta Rydbeck',
            company: 'RISE',
            role: 'Rise Mentor',
            bio:'Märta Rydbeck is Head of Rise, Women in Broadcast, in the Nordics and a senior commercial and business development leader with more than 25 years of international experience. She has held executive roles across corporate organisations, scale-ups and technology-driven businesses, including regional leadership positions at Eurosport, TV4 and Ericsson, as well as advisory and interim roles in SaaS and digital services companies. Märta works at the intersection of leadership, transformation, and commercial strategy, and is passionate about building inclusive, high-performing organisations. Through her role at Rise, she is committed to supporting womens career development and strengthening diverse leadership across the broadcast and media ecosystem.',
            image: getSpeakerImage('Marta Rydbeck')
        }]
      },
      {
        id: 'thu-break-3',
        startTime: '12:45',
        endTime: '13:30',
        title: 'Networking & Lunch',
        track: 'Social',
        isBreak: true
      },
      {
        id: 'thu-72',
        startTime: '13:30',
        endTime: '14:00',
        title: 'TV 2 Norway streaming',
        description: "Can a local player win against global giants? Over the last few years, TV 2 Play has transformed its approach by focusing on what global players often miss: the daily rhythm and specific needs of the Norwegian people. Christian Birkeland shares the story of TV 2's journey from a traditional broadcaster to a more agile, product-driven organization. He explores the practical shifts that allow a local player to stay relevant— a curated experience where technology and business move in sync to bring people together in a fragmented digital world.",
        track: 'Main Stage',
        speakers: [{ 
            name: 'Christian Birkeland',
            role: 'Chief Digital Officer',
            bio: 'Christian Birkeland is the Chief Digital Officer at TV 2 Norway. He joined TV 2 in 2017 to spearhead their streaming ambitions, following his tenure as CEO of the pay-TV operator RiksTV. Since then, TV 2 Play has grown from approximately 200,000 subscribers to become the largest streaming service in Norway. Under his leadership, RiksTV were pioneers in Norway in implementing lean-based product development a focus on agile methodologies and a product-centric mindset that he has since integrated into TV 2. He is currently leading the efforts to transform TV 2 to meet the challenges facing the media industry in the coming years. Birkeland holds an MSc in Computer Science from the Norwegian University of Science and Technology (NTNU).',
            company: 'TV 2 Norway',
            image: getSpeakerImage('Christian Birkeland')
        }
      ]},
            {
        id: 'thu-80',
        startTime: '13:30',
        endTime: '14:00',
        title: 'From trusted content to trusted tech',
        description: "This presentation offers a glimpse into the transformation of a media company from a distributor of content into a provider of technology products. Ritzau, the Danish news agency, is founded on the mission of delivering trustworthy information and depends greatly on how audiences and customers perceive its credibility. In a world where AI is increasingly used to fuel mistrust and misinformation, Kristoffer Hecquet will explore how AI can also be applied as a powerful tool to strengthen trust. Alongside integrating AI-driven solutions into its own workflows, Ritzau is launching a full portfolio of text management tools designed to support production and distribution of trusted information. Kristoffer has more than 15 years of experience in project development within media technology and editorial innovation.",
        track: 'Track 2',
        speakers: [{ name: 'Kristoffer Hecquet', company: 'Ritzau', role: 'Head of projects', image: getSpeakerImage('Kristoffer Hecquet') }]
      },
      {
        id: 'thu-14',
        startTime: '14:00',
        endTime: '14:30',
        title: 'The MediaTech Pendulum: Mapping Past, Present, and Future Industry Shifts',
        description: "Media technology rarely moves in a straight line. It swings, like a pendulum, between opposing forces: cost and control, scale and specialization, efficiency and quality. Understanding these oscillations is key to anticipating where the industry will move next, and acting before the swing. Through case studies, original data analysis, and cross-industry comparisons, this session examines the cyclical nature of media technologys evolution, revealing how historical patterns and emerging signals can inform the industrys future trajectory. You will leave with a practical framework for anticipating these shifts and positioning yourself and your organization to thrive as the pendulum swings once again.",
        track: 'Main Stage',
        speakers: [{ 
            name: 'Lorenzo Zanni',
            role: 'Independent analyst',
            bio: 'I am an independent analyst, consultant, and researcher working at the intersection of media, technology, and data. I spent nine years at IABM, where, as Head of Knowledge, I led content strategy and industry intelligence, establishing the organisation as a thought leader in the media technology sector through an approach that combined actionable analysis with storytelling. Over the past decade, I have collaborated with media companies, membership associations, and technology businesses to help them make better sense of the world around them. Today, my work spans three core areas: research, data analytics, and content creation. I am passionate about finding the stories hidden within data and exploring the evolving relationship between creativity and technology across the media landscape. I also write Sense the Frame, a Substack newsletter that uses data to make sense of what is happening in the world of media, technology, and storytelling.',
            image: getSpeakerImage('Lorenzo Zanni')
        }]
      },
      {
        id: 'thu-897',
        startTime: '14:00',
        endTime: '14:30',
        title: 'Broadcasting in the Worlds Toughest Markets',
        description: "Stephen will take you behind the scenes of Volant Medias mission to deliver secure, reliable broadcasting to audiences in Iran and Afghanistan remotely and at scale. Discover how these unique challenges have driven bold strategies for technology transformation and organisational change, strengthening operations, enhancing security, and enabling resilience in a rapidly shifting media landscape.",
        track: 'Track 2',
        speakers: [
          { 
            name: 'Stephen Willmott', 
            company: 'Volant Media UK', 
            role: 'Director of Technology', 
            image: getSpeakerImage('Stephen Willmott'),
            bio: 'With over 15 years experience in media operations and technology innovation in the UK and Australia, Stephen has been at the forefront of IP and software-based news production. Now heading technology at Volant Media with a focus on business resilience and flexibility.' 
          },
        ]
      },
      {
        id: 'thu-break-2',
        startTime: '14:30',
        endTime: '15:00',
        title: 'Networking & Coffee Break',
        track: 'Social',
        isBreak: true
      },
      {
        id: 'thu-73',
        startTime: '15:00',
        endTime: '15:30',
        title: 'Flimmer - Rethinking Media for the Next Generation',
        description: "Flimmer refuses to accept the media reality that children grow up in today. Thats why they are building a Danish competitor to YouTube with a focus on safety, quality, and childrens well-being. Flimmer works with carefully curated, child-friendly content and creates a digital community that not only engages children on-screen, but also inspires creativity, play, and curiosity beyond the screen. But how do you challenge some of the world’s largest tech companies? In this presentation, Flimmer shares their journey, ambitions, and the concrete work behind creating a responsible digital alternative for children and families.",
        track: 'Main Stage',
        speakers: [{
      name: 'Maria Baagøe Bové',
            role: 'COO',
            bio: 'COO and one of the founders of Flimmer. She is a communications professional and author at Politikens Forlag, with extensive experience in social media and digital communication.',
            company: 'Flimmer',
            image: getSpeakerImage('Maria Baagøe Bové')
      },
      {
      name: 'Magnus Juul',
            role: 'CTO',
            bio: 'CTO at Flimmer and plays a central role in developing the platform\'s technology. He previously spent over eight years with Too Good To Go.',
            company: 'Flimmer',
            image: getSpeakerImage('Magnus Juul')
        }]
      },
      { id: 'thu-813',
        startTime: '15:00',
        endTime: '15:30',
        title: 'Building Sustainable Revenue in Rapidly Changing Markets',
        description: 'Discover how FT Strategies uses real-world industry insights to help media organisations unlock sustainable revenue growth through smarter audience engagement and digital business models.',
        track:  'Track 2',
        speakers: [{
          name: 'Chloe Tsang',
          role: 'Manager',
          bio: 'At FT Strategies, Chloe works with organisations worldwide to grow recurring revenue, strengthen engagement and develop customer-centric digital products. Drawing on experience in content and UX design, journey mapping and newsroom workflows, she translates complex challenges into clear strategies and intuitive, accessible experiences, underpinned by strong qualitative and quantitative research skills and a deep understanding of how news organisations operate.',
          company: 'FT Strategies',
          image: getSpeakerImage('Chloe Tsang')
        }]
      },
      {
        id: 'thu-74',
        startTime: '15:30',
        endTime: '16:00',
        title: 'Project Y - the future is here',
        description: "Most in the media industry have currently used artificial intelligence in their journalistic production. Help is available for research, translation, summaries, transcribing, editing, etc. For all parts of a journalistic process, AI help is available today, which is developing at express speed. But what happens if it is all put together into a production system without journalists or very few. Project Y is such a medium. A medium produced with AI. Project Y is also a tech company that is developing the simple production system of the future for everyone who wants to publish.  Editor-in-chief Michael Dyrby will present Project Y and the media world of the future.",
        track: 'Main Stage',
        speakers: [{ 
            name: 'Michael Dyrby',
            role: 'Editor in Chief',
            bio: 'For over two decades, he was a central figure at TV 2 Denmark, joining in 1994 and eventually serving as the News Director and a member of the executive board from 2010 to 2015. His leadership there was notable for the expansion of the network, including the launch of TV 2 News and TV 2 Sports. After a period away from major leadership, he returned to the industry in 2018 as the Editor-in-Chief of B.T. Now Michael works as Editor in Chief for Project Y',
            company: 'Project Y',
            image: getSpeakerImage('Michael Dyrby')
        }]
      },
          {
        id: 'thu-closing-2',
        startTime: '16:00',
        endTime: '16:15',
        title: 'Closing speech: See you next year',
        track: 'Main Stage',
        isBreak: true
      },
      
    ]
  }
];
