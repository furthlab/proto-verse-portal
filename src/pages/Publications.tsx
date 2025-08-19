import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, ExternalLink, Calendar, Users } from "lucide-react";

const Publications = () => {
  const publications = [
    {
      "title": "Characterization of enhanced ethanol tolerance in Paramecium caudatum after exposure to low ethanol concentrations",
      "authors": [
        "Chikuda Yasutaka",
        "Shimada Yuto",
        "Hasegawa Yuya",
        "Matsuoka Tatsuomi",
        "Arikawa Mikihiko"
      ],
      "journal": "Journal of Protistology",
      "year": "2020",
      "type": "Research Article",
      "abstract": "Paramecium cells acquired tolerance to toxic ethanol concentrations after pretreatment with lower, non-toxic concentrations. Key findings include: (1) pretreatment effect lasted at least 24 h but faded within 48 h; (2) protein-synthesis inhibitors attenuated the effect; (3) tolerance depended on pretreatment duration and ethanol concentration; (4) pretreatment conferred tolerance to both toxic and lethal ethanol levels; and (5) tolerance was also acquired during starvation—suggesting ethanol-induced tolerance in Paramecium as a primitive model for cellular memory function.",
      "doi": "10.18980/jop.e002",
      "pmid": ""
    },    
    {
      title: "Classical conditioning in paramecia",
      authors: ["Hennessey T. M.", "Rucker W. B.", "McDiarmid C. G."],
      journal: "Animal Learning & Behavior",
      year: "1979",
      type: "Research Article",
      abstract: "Single Paramecium caudatum were conditioned by pairing an AC-generated electric shock (US) with a vibratory stimulus (CS) produced by an auditory speaker. Naïve paramecia subjected to shock reliably exhibited a backward jerk and axial spinning similar to the avoiding reaction. Such responses did not occur initially to the CS alone, but increasingly appeared during the CS period preceding shock in a delayed conditioning paradigm. Control subjects given unpaired CS and US did not show increased response to CS alone. Short-term memory was demonstrated by extinction-tested subjects being readily reconditioned. Paramecia stored for 24 h showed reliable memory savings. Differential conditioning with two CSs and a truly random presentation control confirmed that the anticipatory conditional responses were due to pairing contingency and not pseudoconditioning.",
      doi: "10.3758/BF03209695",
      pmid: ""      
    },
    {
      title: "Spiral motion of Paramecium caudatum in a small capillary glass tube",
      authors: ["Fukui K.", "Asai H."],
      journal: "Journal of Protozoology",
      year: "1976",
      type: "Research Article",
      abstract: "The behavior of Paramecium caudatum in small capillary glass tubes was investigated under various ionic conditions and at the various tube diameters. Along the inner walls of the tubes ciliates undergo regular spiral motion, which is completely different from natural spirallings or random walk-like movements observed usually in large vessels. The curvature calculated from the tracks of spiral motions was independent of the inner diameters of capillary tubes, but depend specifically on ionic conditions. A plausible law governing such regular spiral motions of Paramecium caudatum is proposed. A definite part of the anterior end of a ciliate seems to contact the curved surface of the inner wall of a capillary tube during the motion so that the organism receives a constant tactile stimulus, and the direction of motive force keeps a certain angle against the surface.",
      doi: "10.1111/j.1550-7408.1976.tb03840.x",
      pmid: ""
    },
    {
      title: "Mass culture of Paramecium tetraurelia",
      authors: ["Beisson J.", "Bétermier M.", "Bré M.-H.", "Cohen J.", "Duharcourt S.", "Duret L.", "Kung C.", "Malinsky S.", "Meyer E.", "Preer J.R. Jr", "Sperling L."],
      journal: "Cold Spring Harbor Protocols",
      year: "2010",
      type: "Protocol Article",
      abstract: "",
      doi: "10.1101/pdb.prot5362",
      pmid: "20150121"
    },
    {
      title: "Silencing specific Paramecium tetraurelia genes by feeding double-stranded RNA",
      authors: ["Beisson J.", "Bétermier M.", "Bré M.-H.", "Cohen J.", "Duharcourt S.", "Duret L.", "Kung C.", "Malinsky S.", "Meyer E.", "Preer J.R. Jr", "Sperling L."],
      journal: "Cold Spring Harbor Protocols",
      year: "2010",
      type: "Protocol Article",
      abstract: "",
      doi: "10.1101/pdb.prot5363",
      pmid: "20150122"
    },
    {
      title: "DNA microinjection into the macronucleus of Paramecium",
      authors: ["Beisson J.", "Bétermier M.", "Bré M.-H.", "Cohen J.", "Duharcourt S.", "Duret L.", "Kung C.", "Malinsky S.", "Meyer E.", "Preer J.R. Jr", "Sperling L."],
      journal: "Cold Spring Harbor Protocols",
      year: "2010",
      type: "Protocol Article",
      abstract: "",
      doi: "10.1101/pdb.prot5364",
      pmid: "20150123"
    },
    {
      title: "Habituation in non-neural organisms: evidence from slime moulds",
      authors: ["Boisseau R. P.", "Vogel D.", "Dussutour A."],
      journal: "Proceedings of the Royal Society B: Biological Sciences",
      year: "2016",
      type: "Research Article",
      abstract: "Learning, defined as a change in behaviour evoked by experience, has hitherto been investigated almost exclusively in multicellular neural organisms. Evidence for learning in non-neural multicellular organisms is scant, and only a few unequivocal reports of learning have been described in single-celled organisms. Here we demonstrate habituation, an unmistakable form of learning, in the non-neural organism Physarum polycephalum...",
      doi: "10.1098/rspb.2016.0446",
      pmid: "27122563"
    },
    {
      title: "Studying Habituation in Stentor coeruleus",
      authors: ["Rajan D.", "Chudinov P.", "Marshall W."],
      journal: "Journal of Visualized Experiments",
      year: "2023",
      type: "Methods Article",
      abstract: "Learning is usually associated with a complex nervous system, but there is increasing evidence that life at all levels, down to single cells, can display intelligent behaviors. Stentor coeruleus is a unicellular pond-dwelling organism that exhibits habituation...",
      doi: "10.3791/64692",
      pmid: "36688564"   
    }
  ];

  const reviews = [
    {
      title: "Reconsidering the evidence for learning in single cells",
      authors: ["Samuel J. Gershman", "Petra E. M. Balbi", "C. Randy Gallistel", "Jeremy Gunawardena"],
      journal: "eLife",
      year: "2021",
      type: "Review Article",
      abstract: "The question of whether single cells can learn led to much debate in the early 20th century. The view prevailed that they were capable of non-associative learning but not of associative learning...",
      doi: "10.7554/eLife.61907",
      pmid: "33395388"
    },
    {
      title: "Temporal maps and informativeness in associative learning",
      authors: ["Balsam P. D.", "Gallistel C. R."],
      journal: "Trends in Neurosciences",
      year: "2009",
      type: "Review Article",
      abstract: "We review evidence that learning depends, instead, on learning a temporal map...",
      doi: "10.1016/j.tins.2008.10.004",
      pmid: "19136158"
    },
    {
      title: "Learning in single cell organisms",
      authors: ["Dussutour A."],
      journal: "Biochemical and Biophysical Research Communications",
      year: "2021",
      type: "Review Article",
      abstract: "The survival of all species requires appropriate behavioral responses to environmental challenges. Learning is one of the key processes to acquire information about the environment and adapt to changing and uncertain conditions...",
      doi: "10.1016/j.bbrc.2021.02.018",
      pmid: "33632547"      
    }
  ];

  const renderPublicationCard = (pub: any, index: number) => (
    <Card key={index}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight mb-2">{pub.title}</CardTitle>
            <CardDescription className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {pub.authors.join(", ")}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {pub.year}
              </span>
            </CardDescription>
          </div>
          <Badge variant="outline">{pub.type}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{pub.abstract}</p>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="font-medium">{pub.journal}</span>
            {pub.doi && (
              <span className="text-muted-foreground ml-2">
                DOI: {pub.doi}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {pub.pmid && (
              <a 
                href={`https://pubmed.ncbi.nlm.nih.gov/${pub.pmid}/`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  PubMed
                </Button>
              </a>
            )}
            {pub.doi && (
              <a 
                href={`https://doi.org/${pub.doi}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  DOI
                </Button>
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const protocols = publications.filter(p => p.type.includes("Protocol") || p.type.includes("Methods"));
  const articles = publications.filter(p => p.type.includes("Research"));
  const reviewArticles = reviews; // all are reviews

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Publications</h1>
            <p className="text-xl text-muted-foreground">
              Scientific literature and resources related to learning in single cells
            </p>
          </div>

          {/* Research Articles */}
          {articles.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-primary" />
                Research Articles
              </h2>
              <div className="space-y-6">
                {articles.map(renderPublicationCard)}
              </div>
            </div>
          )}

          {/* Protocols / Methods */}
          {protocols.length > 0 && (
            <>
              <Separator className="my-8" />
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-primary" />
                  Protocols / Methods
                </h2>
                <div className="space-y-6">
                  {protocols.map(renderPublicationCard)}
                </div>
              </div>
            </>
          )}

          {/* Review Articles */}
          {reviewArticles.length > 0 && (
            <>
              <Separator className="my-8" />
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6">Review Articles</h2>
                <div className="space-y-6">
                  {reviewArticles.map(renderPublicationCard)}
                </div>
              </div>
            </>
          )}

          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>Submit Your Publication</CardTitle>
              <CardDescription>
                Have you published research using ProtoMem data? Let us know!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                We'd love to feature your research that utilizes our protist genomics database. 
                Submit your publication details and we'll add it to our collection.
              </p>
              <Button>Submit Publication</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Publications;
