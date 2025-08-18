import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, ExternalLink, Calendar, Users } from "lucide-react";

const Publications = () => {
  const publications = [
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
      abstract: "Learning, defined as a change in behaviour evoked by experience, has hitherto been investigated almost exclusively in multicellular neural organisms. Evidence for learning in non-neural multicellular organisms is scant, and only a few unequivocal reports of learning have been described in single-celled organisms. Here we demonstrate habituation, an unmistakable form of learning, in the non-neural organism Physarum polycephalum. In our experiment, using chemotaxis as the behavioural output and quinine or caffeine as the stimulus, we showed that P. polycephalum learnt to ignore quinine or caffeine when the stimuli were repeated, but responded again when the stimulus was withheld for a certain time. Our results meet the principle criteria that have been used to demonstrate habituation: responsiveness decline and spontaneous recovery. To distinguish habituation from sensory adaptation or motor fatigue, we also show stimulus specificity. Our results point to the diversity of organisms lacking neurons, which likely display a hitherto unrecognized capacity for learning, and suggest that slime moulds may be an ideal model system in which to investigate fundamental mechanisms underlying learning processes. Besides, documenting learning in non-neural organisms such as slime moulds is centrally important to a comprehensive, phylogenetic understanding of when and where in the tree of life the earliest manifestations of learning evolved.",
      doi: "10.1098/rspb.2016.0446",
      pmid: "27122563"
    },
    {
      title: "Studying Habituation in Stentor coeruleus",
      authors: ["Rajan D.", "Chudinov P.", "Marshall W."],
      journal: "Journal of Visualized Experiments",
      year: "2023",
      type: "Methods Article",
      abstract: "Learning is usually associated with a complex nervous system, but there is increasing evidence that life at all levels, down to single cells, can display intelligent behaviors. In both natural and artificial systems, learning is the adaptive updating of system parameters based on new information, and intelligence is a measure of the computational process that facilitates learning. Stentor coeruleus is a unicellular pond-dwelling organism that exhibits habituation, a form of learning in which a behavioral response decreases following a repeated stimulus. Stentor contracts in response to mechanical stimulation, which is an apparent escape response from aquatic predators. However, repeated low-force perturbations induce habituation, demonstrated by a progressive reduction in contraction probability. Here, we introduce a method for quantifying Stentor habituation using a microcontroller board-linked apparatus that can deliver mechanical pulses at a specified force and frequency, including methods for building the apparatus and setting up the experiment in a way that minimizes external perturbations. In contrast to the previously described approaches for mechanically stimulating Stentor, this device allows the force of stimulation to be varied under computer control during the course of a single experiment, thus greatly increasing the variety of input sequences that can be applied. Understanding habituation at the level of a single cell will help characterize learning paradigms that are independent of complex circuitry.",
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
      abstract: "The question of whether single cells can learn led to much debate in the early 20th century. The view prevailed that they were capable of non-associative learning but not of associative learning, such as Pavlovian conditioning. Experiments indicating the contrary were considered either non-reproducible or subject to more acceptable interpretations. Recent developments suggest that the time is right to reconsider this consensus. We exhume the experiments of Beatrice Gelber on Pavlovian conditioning in the ciliate Paramecium aurelia, and suggest that criticisms of her findings can now be reinterpreted. Gelber was a remarkable scientist whose absence from the historical record testifies to the prevailing orthodoxy that single cells cannot learn. Her work, and more recent studies, suggest that such learning may be evolutionarily more widespread and fundamental to life than previously thought and we discuss the implications for different aspects of biology.",
      doi: "10.7554/eLife.61907",
      pmid: "33395388"
    },
    {
      title: "Temporal maps and informativeness in associative learning",
      authors: ["Balsam P. D.", "Gallistel C. R."],
      journal: "Trends in Neurosciences",
      year: "2009",
      type: "Review Article",
      abstract: "We review evidence that learning depends, instead, on learning a temporal map. Temporal relations between events are encoded even from single experiences.",
      doi: "10.1016/j.tins.2008.10.004",
      pmid: "19136158"
    },
    {
      title: "Learning in single cell organisms",
      authors: ["Dussutour A."],
      journal: "Biochemical and Biophysical Research Communications",
      year: "2021",
      type: "Review Article",
      abstract: "The survival of all species requires appropriate behavioral responses to environmental challenges. Learning is one of the key processes to acquire information about the environment and adapt to changing and uncertain conditions. Learning has long been acknowledged in animals from invertebrates to vertebrates but remains a subject of debate in non-animal systems such as plants and single cell organisms. In this review I will attempt to answer the following question: are single cell organisms capable of learning? I will first briefly discuss the concept of learning and argue that the ability to acquire and store information through learning is pervasive and may be found in single cell organisms. Second, by focusing on habituation, the simplest form of learning, I will review a series of experiments showing that single cell organisms such as slime molds and ciliates display habituation and follow most of the criteria adopted by neuroscientists to define habituation. Then I will discuss disputed evidence suggesting that single cell organisms might also undergo more sophisticated forms of learning such as associative learning. Finally, I will stress out that the challenge for the future is less about whether or not single cell organisms fulfill the definition of learning established from extensive studies in animal systems and more about acknowledging and understanding the range of behavioral plasticity exhibited by such fascinating organisms.",
      doi: "10.1016/j.bbrc.2021.02.018",
      pmid: "33632547"      
    }
  ];

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

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Recent Publications
            </h2>
            
            <div className="space-y-6">
              {publications.map((pub, index) => (
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
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          PubMed
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          DOI
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator className="my-8" />

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Review Articles</h2>
            <div className="grid gap-4">
              {reviews.map((review, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{review.title}</CardTitle>
                        <CardDescription>
                          {review.authors.join(", ")} • {review.journal} • {review.year}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">{review.type}</Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

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